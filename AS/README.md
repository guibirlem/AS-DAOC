# Mini E-commerce (AS) — Documentação resumida

Como rodar:
1. npm install
2. npm run dev
   - JSON Server: http://localhost:3000 (endpoint /produtos)
   - Frontend Vite: http://localhost:5173

Context API (carrinho):
- Arquivo: src/context/CartContext.jsx
- Armazena: cart (array de itens), funções addToCart, increase, decrease, remove, total.
- Consumido em: Header, Produto, Carrinho.

API (JSON Server):
- Endpoints usados:
  - GET /produtos
  - GET /produtos/:id
  - POST /produtos
  - PUT /produtos/:id
  - DELETE /produtos/:id
- Exemplo: fetch('http://localhost:3000/produtos')

Páginas implementadas:
- / → Home (listagem)
- /produto/:id → detalhes e adicionar ao carrinho (respeita estoque)
- /carrinho → gerencia quantidades e remoção
- /cadastro → cria produto via POST (validações + useRef)
- /editar/:id → edita via PUT
- * → 404

Observações:
- Tailwind via CDN em index.html para simplificar configuração.
- O carrinho persiste em localStorage (key 'cart_v1').
