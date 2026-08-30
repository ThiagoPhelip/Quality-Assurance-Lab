const baseUrl = new URL(
  process.env.BASE_URL || "https://automationpratice.com.br/",
);
const timeoutMs = Number(process.env.TARGET_TIMEOUT_MS || 12_000);
const attempts = Number(process.env.TARGET_ATTEMPTS || 2);
const retryDelayMs = Number(process.env.TARGET_RETRY_DELAY_MS || 2_000);

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

class TargetUnavailableError extends Error {}
class TargetContractError extends Error {}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        accept: "text/html,application/javascript;q=0.9,*/*;q=0.8",
        "user-agent": "Quality-Assurance-Lab/target-preflight",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new TargetContractError(`${url.pathname}: HTTP ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof TargetContractError) {
      throw error;
    }

    const reason = error.cause?.code || error.name || error.message;
    throw new TargetUnavailableError(`${url.pathname}: ${reason}`);
  } finally {
    clearTimeout(timeout);
  }
}

async function checkTarget() {
  const routes = ["/", "/login", "/cart"];
  const pages = await Promise.all(
    routes.map(async (route) => {
      const url = new URL(route, baseUrl);
      const body = await fetchText(url);
      if (!body.trim()) {
        throw new TargetContractError(`${url.pathname}: resposta vazia`);
      }
      return { route, body };
    }),
  );

  const home = pages.find(({ route }) => route === "/").body;
  if (!/qazando/i.test(home)) {
    throw new TargetContractError(
      "a página inicial não contém a marca QAZANDO",
    );
  }

  const scriptMatch = home.match(
    /<script\b[^>]*\bsrc=["']([^"']+\.js(?:\?[^"']*)?)["'][^>]*>/i,
  );
  if (!scriptMatch) {
    throw new TargetContractError("nenhum bundle JavaScript foi encontrado");
  }

  const bundleUrl = new URL(scriptMatch[1], baseUrl);
  const bundle = await fetchText(bundleUrl);
  if (bundle.length < 100) {
    throw new TargetContractError(
      "o bundle JavaScript retornou conteúdo incompleto",
    );
  }
}

async function main() {
  let lastError;
  let contractError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await checkTarget();
      console.log(
        `Target disponível em ${baseUrl.origin} (tentativa ${attempt}).`,
      );
      return 0;
    } catch (error) {
      lastError = error;
      if (error instanceof TargetContractError) {
        contractError = error;
      }
      const category =
        error instanceof TargetContractError
          ? "Contrato mínimo inválido"
          : "Target sem conectividade";
      console.warn(
        `${category} em ${baseUrl.origin} (tentativa ${attempt}/${attempts}): ${error.message}`,
      );
      if (attempt < attempts) {
        await sleep(retryDelayMs);
      }
    }
  }

  if (contractError) {
    console.error(`Preflight reprovado: ${contractError.message}.`);
    return 1;
  }

  console.error(
    `Preflight sem conectividade: ${lastError?.message || "erro desconhecido"}.`,
  );
  return 2;
}

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
  })
  .catch((error) => {
    console.error(`Preflight não pôde ser executado: ${error.message}.`);
    process.exitCode = 1;
  });
