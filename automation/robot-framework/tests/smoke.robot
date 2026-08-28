*** Settings ***
Documentation    Smoke tests independentes da QAZANDO Shop.
Resource         ../resources/common.resource
Test Setup       Abrir aplicação
Test Teardown    Fechar aplicação
Test Tags        smoke

*** Test Cases ***
Página inicial deve carregar
    Get Title    ==    QAZANDO Shop E-Commerce
    Get Element Count    css=a[href*="product-details"]    >    0

Página de login deve estar acessível
    Go To    ${BASE_URL}/login
    Get Url    contains    /login
    Get Element    css=input[type="password"]

Catálogo deve listar produtos
    Go To    ${BASE_URL}/shop
    Get Element Count    css=a[href*="product-details"]    >    0

Carrinho deve permitir avançar ao checkout
    Go To    ${BASE_URL}/cart
    Get Text    css=body    contains    Fit-Flare Dress
    Get Element    css=a[href="/checkout-one"]
    Get Text    css=body    contains    PROCEED TO CHECKOUT

Checkout deve apresentar endereço e ação final
    Go To    ${BASE_URL}/cart
    Click    text=PROCEED TO CHECKOUT
    Get Element    id=faddress
    Get Text    css=body    contains    PLACE ORDER
