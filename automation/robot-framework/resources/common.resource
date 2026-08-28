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
