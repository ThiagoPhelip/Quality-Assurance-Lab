*** Settings ***
Documentation    Smoke tests independentes da QAZANDO Shop.
Resource         ../resources/common.resource
Suite Setup      Abrir aplicação
Suite Teardown   Fechar aplicação
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
