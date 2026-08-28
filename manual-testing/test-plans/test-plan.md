# Plano de testes — QAZANDO Shop

## Objetivo

Validar os fluxos críticos do e-commerce em desktop e mobile, priorizando catálogo, autenticação, carrinho e checkout.

## Escopo

- Home, catálogo e detalhe do produto.
- Cadastro e login, incluindo validações negativas.
- Inclusão, alteração e remoção no carrinho.
- Checkout até a confirmação anterior a qualquer operação externa.
- Contato, navegação, responsividade e acessibilidade básica.

## Fora do escopo

- Cobrança real, testes destrutivos e carga não autorizada.
- Sistemas de terceiros e API interna sem contrato público.

## Estratégia e ambientes

Chrome, Firefox e WebKit nas duas últimas versões; larguras de 375, 768 e 1440 px. Executar smoke a cada mudança e regressão antes de release. Dados devem ser sintéticos e únicos.

## Critérios

Entrada: ambiente disponível, build identificado e dados preparados. Saída: 100% do smoke aprovado, nenhum defeito crítico/alto aberto e ao menos 95% da regressão aprovada.

## Riscos

Dependência do site público, dados compartilhados e seletores sem atributos estáveis. Mitigar com retentativas limitadas, evidências e preferência por atributos semânticos.

