"use client";

import { useEffect } from "react";
import { useProdutos } from "./stores/useProdutos";
import ProdutoCard from "./components/ProdutoCard";
import { Indicadores } from "./components/Indicadores";
import { Atalhos } from "./components/Atalhos";
import { FormProduto } from "./components/FormProduto";

export default function ProdutosPage() {
  const { produtos, carregarProdutos, deletarProduto } = useProdutos();


  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <FormProduto open={false} onOpenChange={() => {}} />
      </div>

      <Indicadores />
      <Atalhos />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onExcluir={() => deletarProduto(produto.id)}
            onEditar={(produto) => console.log("Editar produto", produto)}
          />
        ))}
      </div>

    </div>
  );
}
