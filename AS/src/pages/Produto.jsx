import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduto } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, message } = useCart();

  useEffect(() => {
    setLoading(true);
    getProduto(id)
      .then(p => setProduto(p))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAdd() {
    const qty = await addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      imagem: produto.imagem
    });
    if (qty !== null) {
      try {
        const updated = await getProduto(id);
        setProduto(updated);
      } catch {}
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={produto.imagem} alt={produto.nome} className="w-full md:w-1/2 h-64 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{produto.nome}</h1>
          <p className="mt-2 text-gray-700">{produto.descricao}</p>
          <p className="mt-2 font-semibold">R$ {produto.preco.toFixed(2)}</p>
          <p className="mt-1">Estoque: {produto.estoque}</p>
          {produto.estoque === 0 ? (
            <button disabled className="mt-4 bg-gray-300 text-white px-4 py-2 rounded">Esgotado</button>
          ) : (
            <div className="mt-4">
              <button
                onClick={handleAdd}
                disabled={produto.estoque === 0}
                className={`px-4 py-2 rounded text-white ${produto.estoque === 0 ? 'bg-gray-400' : 'bg-green-600'}`}
              >
                {produto.estoque === 0 ? 'Estoque máximo atingido' : 'Adicionar ao Carrinho'}
              </button>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
