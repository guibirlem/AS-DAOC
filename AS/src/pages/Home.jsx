import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProdutos } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Home() {
	const { message } = useCart();
	const [produtos, setProdutos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const [search, setSearch] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	useEffect(() => {
		setLoading(true);
		getProdutos()
			.then(setProdutos)
			.catch(e => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (!message) return;
		getProdutos()
			.then(setProdutos)
			.catch(() => {});
	}, [message]);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p className="text-red-600">Erro: {error}</p>;

	const filtered = produtos.filter(p => {
		const term = search.trim().toLowerCase();
		if (term) {
			const inText = `${p.nome} ${p.descricao}`.toLowerCase().includes(term);
			if (!inText) return false;
		}
		const preco = Number(p.preco);
		if (minPrice !== '' && !isNaN(Number(minPrice)) && preco < Number(minPrice)) return false;
		if (maxPrice !== '' && !isNaN(Number(maxPrice)) && preco > Number(maxPrice)) return false;
		return true;
	});

	function clearFilters() {
		setSearch('');
		setMinPrice('');
		setMaxPrice('');
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Produtos</h1>

			{/* Barra de pesquisa / filtros */}
			<div className="bg-white p-4 rounded shadow mb-4">
				<div className="flex flex-col md:flex-row gap-2 md:items-end">
					<div className="flex-1">
						<label className="block text-sm">Pesquisar</label>
						<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nome ou descrição" className="w-full p-2 border border-gray-300 rounded" />
					</div>

					<div className="w-32">
						<label className="block text-sm">Preço min</label>
						<input value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" min="0" className="w-full p-2 border border-gray-300 rounded" />
					</div>

					<div className="w-32">
						<label className="block text-sm">Preço max</label>
						<input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" min="0" className="w-full p-2 border border-gray-300 rounded" />
					</div>

					<div className="md:ml-2">
						<button onClick={clearFilters} className="bg-gray-200 px-4 py-2 rounded text-sm">Limpar</button>
					</div>
				</div>
			</div>

			{message && <p className="text-sm text-green-600 mb-4">{message}</p>}

			<div className="grid md:grid-cols-3 gap-4">
				{filtered.map(p => (
					<div key={p.id} className="bg-white p-4 rounded shadow">
						<img src={p.imagem} alt={p.nome} className="w-full h-40 object-cover mb-2 rounded" />
						<h2 className="font-bold">{p.nome}</h2>
						<p className="text-gray-600">R$ {Number(p.preco).toFixed(2)}</p>
						<p className="text-sm">{p.estoque > 0 ? `Estoque: ${p.estoque}` : <span className="text-red-600">Esgotado</span>}</p>
						<div className="mt-2 flex justify-between items-center">
							<Link to={`/produto/${p.id}`} className="text-white bg-blue-600 px-3 py-1 rounded">Ver Detalhes</Link>
							<Link to={`/editar/${p.id}`} className="text-sm text-gray-500">Editar</Link>
						</div>
					</div>
				))}
				{filtered.length === 0 && <p>Nenhum produto encontrado com esses filtros.</p>}
			</div>
		</div>
	);
}
