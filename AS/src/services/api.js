const BASE = 'http://localhost:3000';

export async function getProdutos() {
  const res = await fetch(`${BASE}/produtos`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export async function getProduto(id) {
  const res = await fetch(`${BASE}/produtos/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  return res.json();
}

export async function createProduto(payload) {
  const res = await fetch(`${BASE}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Erro ao criar produto');
  return res.json();
}

export async function updateProduto(id, payload) {
  const res = await fetch(`${BASE}/produtos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Erro ao atualizar produto');
  return res.json();
}

export async function deleteProduto(id) {
  const res = await fetch(`${BASE}/produtos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar produto');
  return true;
}
