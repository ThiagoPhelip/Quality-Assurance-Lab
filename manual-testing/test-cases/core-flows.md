# Casos de teste prioritários

| ID | Cenário | Passos resumidos | Resultado esperado | Prioridade |
|---|---|---|---|---|
| CT-001 | Abrir catálogo | Acessar `/shop` | Produtos, preços e links são exibidos | Alta |
| CT-002 | Consultar produto | Abrir o primeiro produto | Nome, imagem, preço e ação de compra aparecem | Alta |
| CT-003 | Adicionar ao carrinho | Adicionar produto e abrir `/cart` | Item e valores aparecem no carrinho | Crítica |
| CT-004 | Alterar quantidade | Aumentar e reduzir quantidade | Totais são recalculados corretamente | Alta |
| CT-005 | Remover produto | Remover o único item | Carrinho fica vazio sem valor residual | Alta |
| CT-006 | Login inválido | Informar credenciais inválidas | Acesso é negado e há feedback claro | Alta |
| CT-007 | Cadastro obrigatório | Enviar cadastro vazio | Campos obrigatórios são indicados | Alta |
| CT-008 | E-mail inválido | Cadastrar e-mail malformado | Cadastro é bloqueado com mensagem adequada | Média |
| CT-009 | Checkout vazio | Abrir checkout sem itens | Aplicação impede conclusão e orienta o usuário | Alta |
| CT-010 | Navegação responsiva | Repetir smoke em 375 px | Conteúdo permanece acessível sem corte | Média |
| CT-011 | Teclado | Navegar sem mouse | Foco visível e ordem lógica | Média |
| CT-012 | Contato obrigatório | Enviar formulário vazio | Campos obrigatórios são indicados | Média |

