# BUG-001 — Produto selecionado não é adicionado ao carrinho

- Ambiente/build: `https://automationpratice.com.br`, acessado em 28/08/2026
- Navegador/dispositivo: Chrome 151 desktop, reprodução adicional com Playwright Chromium
- Severidade: Alta
- Prioridade: Alta
- Pré-condição: aplicação carregada e catálogo acessível

## Passos para reproduzir

1. Acessar `/shop` ou `/product-details-one/1`.
2. Selecionar `Green Dress For Woman`.
3. Acionar `ADD TO CART`.
4. Abrir `/cart`.

## Resultado atual

O produto selecionado não aparece. O carrinho mantém apenas os itens estáticos `Fit-Flare Dress`, `Midi Dress` e `Tulip Dress`, totalizando `$107.00`.

## Resultado esperado

O produto selecionado deve aparecer no carrinho, com quantidade, preço e total recalculados.

## Evidências

Reproduzido por inspeção automatizada em Chrome e Playwright. O cenário foi retirado do quality gate por ser um defeito do sistema externo, mas permanece documentado para reteste.
