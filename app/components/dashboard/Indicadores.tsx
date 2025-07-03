"use client";

import { useState } from "react";
import { PackageSearch, Boxes, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Produto } from "@/app/produtos/types/ProdutoItf";

export function Indicadores({ produtos }: { produtos: Produto[] }) {
  const [openDialog, setOpenDialog] = useState(false);

  const produtosComEstoqueBaixo = produtos.filter((p) => p.estoque < 5);
  const totalProdutos = produtos.length;
  const custoTotal = produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0);

  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
        {/* Card Estoque Baixo */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-muted transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
                <PackageSearch className="h-5 w-5" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {produtosComEstoqueBaixo.length}
              </CardContent>
            </Card>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Produtos com estoque baixo</DialogTitle>
            </DialogHeader>
            {produtosComEstoqueBaixo.length > 0 ? (
              <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                {produtosComEstoqueBaixo.map((p) => (
                  <li key={p.id} className="text-sm text-gray-800 dark:text-gray-100">
                    <strong>{p.nome}</strong> — {p.estoque} unidade(s)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum produto com estoque baixo.</p>
            )}
          </DialogContent>
        </Dialog>

        {/* Card Total Produtos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Boxes className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {totalProdutos}
          </CardContent>
        </Card>

        {/* Card Valor Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Valor Total em Estoque</CardTitle>
            <DollarSign className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatarValor(custoTotal)}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
