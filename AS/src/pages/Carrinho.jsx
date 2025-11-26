import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function Carrinho() {
  const { cart, increase, decrease, remove, total, message } = useCart();

  if (cart.length === 0) return <p>Seu carrinho está vazio.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Carrinho</h1>
      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
            <img src={item.imagem} alt={item.nome} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{item.nome}</h2>
                <p>R$ {item.preco.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600">Estoque máximo: {item.estoque ?? '—'}</p>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => decrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantidade}</span>
                <button onClick={() => increase(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => remove(item.id)} className="ml-4 text-red-600">Remover</button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">Total</p>
              <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total geral: R$ {total.toFixed(2)}</p>
      </div>
    </div>
  );
}
