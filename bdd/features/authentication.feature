# language: pt
Funcionalidade: Autenticação do cliente
  Como cliente da loja
  Quero receber feedback ao autenticar
  Para acessar minha conta com segurança

  @smoke
  Cenário: Abrir a página de login
    Dado que acesso a página inicial
    Quando navego para o login
    Então devo visualizar o formulário de login

  Cenário: Autenticar com credenciais sintéticas preenchidas
    Dado que estou na página de login
    Quando informo credenciais sintéticas
    Então devo acessar minha conta
