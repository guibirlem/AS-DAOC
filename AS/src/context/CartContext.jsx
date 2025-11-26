import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProduto, updateProduto } from '../services/api.js';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(cart));
  }, [cart]);

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  }

  async function addToCart(prod) {
    try {
      const prodServer = await getProduto(prod.id);
      if (prodServer.estoque <= 0) {
        showMessage('Produto sem estoque');
        return null;
      }
      await updateProduto(prod.id, { ...prodServer, estoque: prodServer.estoque - 1 });

      let newQuantity = 1;
      setCart(prev => {
        const exists = prev.find(p => p.id === prod.id);
        if (!exists) {
          const newCart = [...prev, { id: prod.id, nome: prod.nome, preco: prod.preco, quantidade: 1, imagem: prod.imagem, estoque: prod.estoque }];
          showMessage('Adicionado 1 ao carrinho');
          return newCart;
        }
        newQuantity = exists.quantidade + 1;
        const updated = prev.map(p => p.id === prod.id ? { ...p, quantidade: newQuantity } : p);
        showMessage(`Adicionado ${newQuantity} ao carrinho`);
        return updated;
      });
      return newQuantity;
    } catch (err) {
      console.error(err);
      showMessage('Erro ao adicionar ao carrinho');
      return null;
    }
  }

  async function increase(id) {
    try {
      const prodServer = await getProduto(id);
      if (prodServer.estoque <= 0) {
        showMessage('Estoque máximo atingido');
        return null;
      }
      await updateProduto(id, { ...prodServer, estoque: prodServer.estoque - 1 });

      let newQuantity = null;
      setCart(prev => {
        const updated = prev.map(p => (p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p));
        const item = updated.find(p => p.id === id);
        if (item) {
          newQuantity = item.quantidade;
          showMessage(`Adicionado ${item.quantidade} ao carrinho`);
        }
        return updated;
      });
      return newQuantity;
    } catch (err) {
      console.error(err);
      showMessage('Erro ao aumentar quantidade');
      return null;
    }
  }

  async function decrease(id) {
    try {
      const item = cart.find(p => p.id === id);
      if (!item) return;
      const prodServer = await getProduto(id);
      await updateProduto(id, { ...prodServer, estoque: prodServer.estoque + 1 });

      setCart(prev => {
        const exists = prev.find(p => p.id === id);
        if (!exists) return prev;
        if (exists.quantidade <= 1) {
          return prev.filter(p => p.id !== id);
        }
        return prev.map(p => p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p);
      });
    } catch (err) {
      console.error(err);
      showMessage('Erro ao diminuir quantidade');
    }
  }

  async function remove(id) {
    try {
      const item = cart.find(p => p.id === id);
      if (item) {
        const prodServer = await getProduto(id);
        await updateProduto(id, { ...prodServer, estoque: prodServer.estoque + item.quantidade });
      }
      setCart(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      showMessage('Erro ao remover item');
    }
  }

  const total = cart.reduce((s, item) => s + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, remove, total, message, showMessage }}>
      {children}
    </CartContext.Provider>
  );
}
