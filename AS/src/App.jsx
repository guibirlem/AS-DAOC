import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Produto from './pages/Produto.jsx';
import Carrinho from './pages/Carrinho.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Editar from './pages/Editar.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/editar/:id" element={<Editar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
