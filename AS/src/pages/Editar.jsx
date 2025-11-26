import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduto, updateProduto } from '../services/api.js';

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const refs = {
    nome: useRef(),
    descricao: useRef(),
    preco: useRef(),
    imagem: useRef(),
    estoque: useRef()
  };

  useEffect(() => {
    getProduto(id).then(p => {
      setValues({ nome: p.nome, descricao: p.descricao, preco: String(p.preco), imagem: p.imagem, estoque: String(p.estoque) });
    }).catch(() => {});
  }, [id]);

  function validate() {
    const e = {};
    if (!values.nome?.trim()) e.nome = 'Nome é obrigatório';
    if (!values.descricao?.trim()) e.descricao = 'Descrição é obrigatória';
    if (values.preco === '' || isNaN(Number(values.preco)) || Number(values.preco) < 0) e.preco = 'Preço inválido';
    if (!values.imagem?.trim()) e.imagem = 'URL da imagem é obrigatória';
    if (values.estoque === '' || isNaN(Number(values.estoque)) || Number(values.estoque) < 0) e.estoque = 'Estoque inválido';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) {
      const first = Object.keys(eobj)[0];
      refs[first].current?.focus();
      return;
    }
    try {
      await updateProduto(id, {
        nome: values.nome,
        descricao: values.descricao,
        preco: Number(values.preco),
        imagem: values.imagem,
        estoque: Number(values.estoque)
      });
      navigate('/');
    } catch {
      alert('Erro ao atualizar');
    }
  }

  if (!values) return <p>Carregando...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nome</label>
          <input ref={refs.nome} value={values.nome} onChange={e => setValues({...values, nome: e.target.value})} className={`w-full p-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded`} />
          {errors.nome && <p className="text-red-600 text-sm">{errors.nome}</p>}
        </div>
        <div>
          <label>Descrição</label>
          <textarea ref={refs.descricao} value={values.descricao} onChange={e => setValues({...values, descricao: e.target.value})} className={`w-full p-2 border ${errors.descricao ? 'border-red-500' : 'border-gray-300'} rounded`}/>
          {errors.descricao && <p className="text-red-600 text-sm">{errors.descricao}</p>}
        </div>
        <div>
          <label>Preço</label>
          <input ref={refs.preco} value={values.preco} onChange={e => setValues({...values, preco: e.target.value})} className={`w-full p-2 border ${errors.preco ? 'border-red-500' : 'border-gray-300'} rounded`} />
          {errors.preco && <p className="text-red-600 text-sm">{errors.preco}</p>}
        </div>
        <div>
          <label>URL da imagem</label>
          <input ref={refs.imagem} value={values.imagem} onChange={e => setValues({...values, imagem: e.target.value})} className={`w-full p-2 border ${errors.imagem ? 'border-red-500' : 'border-gray-300'} rounded`} />
          {errors.imagem && <p className="text-red-600 text-sm">{errors.imagem}</p>}
        </div>
        <div>
          <label>Estoque</label>
          <input ref={refs.estoque} value={values.estoque} onChange={e => setValues({...values, estoque: e.target.value})} className={`w-full p-2 border ${errors.estoque ? 'border-red-500' : 'border-gray-300'} rounded`} />
          {errors.estoque && <p className="text-red-600 text-sm">{errors.estoque}</p>}
        </div>
        <div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </form>
    </div>
  );
}
