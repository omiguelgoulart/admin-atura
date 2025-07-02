"use client";

import { useEffect, useState } from "react";
import { useProdutos } from "./stores/useProdutos";
import ProdutoCard from "./components/ProdutoCard";
import { FormProduto } from "./components/FormProduto";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiltroProduto } from "./components/FiltroProduto";

export default function ProdutosPage() {
  const { produtos, carregarProdutos, deletarProduto, filtrarProdutos } =
    useProdutos();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    carregarProdutos(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Produto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <FormProduto open={open} onOpenChange={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <FiltroProduto
        onFiltrar={(filtros) => filtrarProdutos(filtros)}
        onLimpar={() => filtrarProdutos({})}
      />

      {/* Lista de produtos */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
