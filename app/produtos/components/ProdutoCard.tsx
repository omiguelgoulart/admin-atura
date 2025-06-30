"use client";

import { useState } from "react";
import { Produto } from "../types/ProdutoItf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { FormProduto } from "./FormProduto";
import { ConfirmarExclusao } from "./ConfirmarExclusao";

interface Props {
  produto: Produto;
  onExcluir: (id: number) => void;
  onEditar: (produto: Produto) => void;
}

export default function ProdutoCard({ produto, onExcluir }: Props) {
  const [abrirEdicao, setAbrirEdicao] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  return (
    <>
      <Card className="hover:shadow-md transition">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold">{produto.nome}</CardTitle>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => setAbrirEdicao(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => setConfirmarExclusao(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <div><strong>Categoria:</strong> {produto.categoria}</div>
            <div><strong>Marca:</strong> {produto.marca?.nome ?? "Não informada"}</div>
            <div><strong>Estoque:</strong> {produto.estoque} unidades</div>
            <div><strong>Volume:</strong> {produto.volumeMl ?? "-"} mL</div>
            <div><strong>Preço:</strong> R$ {produto.preco.toFixed(2).replace(".", ",")}</div>
          </div>
        </CardContent>
      </Card>

      <FormProduto open={abrirEdicao} onOpenChange={setAbrirEdicao} produto={produto} />
      <ConfirmarExclusao
        open={confirmarExclusao}
        onOpenChange={setConfirmarExclusao}
        onConfirmar={() => {
          onExcluir(produto.id);
          setConfirmarExclusao(false);
        }}
      />
    </>
  );
}
