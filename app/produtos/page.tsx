"use client";

import { useEffect, useState } from "react";
import { useProdutos } from "./stores/useProdutos";
import ProdutoCard from "./components/ProdutoCard";
import { Indicadores } from "./components/Indicadores";
import { Atalhos } from "./components/Atalhos";
import { FormProduto } from "./components/FormProduto";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProdutosPage() {
  const { produtos, carregarProdutos, deletarProduto } = useProdutos();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  return (
    <div className="m-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <FormProduto open={open} onOpenChange={setOpen} />
          </DialogContent>
        </Dialog>
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
