"use client";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  estoque: number;
}

export function KPICards({ produtos }: { produtos: Produto[] }) {
  const totalProdutos = produtos.length;
  const totalEstoque = produtos.reduce((acc, p) => acc + p.estoque, 0);
  const categoriasUnicas = new Set(produtos.map(p => p.categoria));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-4 border rounded-md bg-white shadow">
        <p className="text-gray-500 text-sm">Total de Produtos</p>
        <h3 className="text-2xl font-bold">{totalProdutos}</h3>
      </div>
      <div className="p-4 border rounded-md bg-white shadow">
        <p className="text-gray-500 text-sm">Total em Estoque</p>
        <h3 className="text-2xl font-bold">{totalEstoque}</h3>
      </div>
      <div className="p-4 border rounded-md bg-white shadow">
        <p className="text-gray-500 text-sm">Categorias</p>
        <h3 className="text-2xl font-bold">{categoriasUnicas.size}</h3>
      </div>
    </div>
  );
}
