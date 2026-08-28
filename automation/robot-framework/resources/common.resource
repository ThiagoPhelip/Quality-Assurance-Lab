*** Settings ***
Library    Browser

*** Variables ***
${BASE_URL}    %{BASE_URL=https://automationpratice.com.br}

*** Keywords ***
Abrir aplicação
    New Browser    chromium    headless=${TRUE}
    New Context
    New Page    ${BASE_URL}

Fechar aplicação
    Close Browser

Adicionar primeiro produto
    Go To    ${BASE_URL}/cart
    Click    text=CLEAR CART
    Go To    ${BASE_URL}/shop
    Click    css=.add-to-cart >> nth=0
