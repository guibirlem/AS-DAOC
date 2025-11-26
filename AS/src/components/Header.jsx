import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.quantidade, 0);
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mini E-commerce</Link>
        <nav className="space-x-4">
          <Link to="/cadastro" className="text-sm text-blue-600">Cadastro</Link>
          <Link to="/carrinho" className="text-sm text-blue-600">Carrinho ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
