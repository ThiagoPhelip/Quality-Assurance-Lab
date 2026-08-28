# language: pt
Funcionalidade: Carrinho e checkout
  Como cliente
  Quero revisar a compra
  Para avançar com segurança até o checkout

  @smoke
  Cenário: Acessar o carrinho
    Dado que acesso o catálogo
    Quando abro o carrinho
    Então devo visualizar a opção de avançar ao checkout

  Cenário: Consultar os campos essenciais do checkout
    Dado que acesso o checkout
    Então devo visualizar endereço e ação de finalizar pedido
