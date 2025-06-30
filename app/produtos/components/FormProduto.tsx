"use client";

import { useEffect } from "react";
import { Produto } from "../types/ProdutoItf";
import { useForm } from "react-hook-form";
import { useMarcas } from "../stores/useMarcas";
import { useProdutos } from "../stores/useProdutos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormMarca } from "./FormMarca";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto?: Produto;
}

export function FormProduto({ open, onOpenChange, produto }: Props) {
  const { register, handleSubmit, setValue, reset } = useForm<Produto>();
  const { marcas, carregarMarcas } = useMarcas();
  const { criarProduto, editarProduto } = useProdutos();

  useEffect(() => {
    carregarMarcas();
  }, [carregarMarcas]);

  useEffect(() => {
    if (produto) {
      reset(produto);
    } else {
      reset();
    }
  }, [produto, reset]);

  const onSubmit = async (data: Produto) => {
    const dados = {
      ...data,
      preco: Number(data.preco),
      estoque: Number(data.estoque),
      volumeMl: data.volumeMl !== undefined && data.volumeMl !== null && String(data.volumeMl) !== "" ? Number(data.volumeMl) : 0,
      marcaId: data.marca?.id,
    };

    if (produto?.id) {
      await editarProduto(produto.id, dados);
    } else {
      await criarProduto(dados);
    }

    onOpenChange(false);
  };

  const handleMarcaChange = (id: string) => {
    const m = marcas.find((marca) => marca.id === Number(id));
    if (m) setValue("marca", m);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{produto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input {...register("nome", { required: true })} />
            </div>
            <div>
              <Label>Categoria</Label>
              <Input {...register("categoria", { required: true })} />
            </div>
          </div>

          <div>
            <Label>Descrição</Label>
            <Input {...register("descricao", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Preço</Label>
              <Input type="number" step="0.01" {...register("preco", { required: true })} />
            </div>
            <div>
              <Label>Estoque</Label>
              <Input type="number" {...register("estoque", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Volume (ml)</Label>
              <Input type="number" {...register("volumeMl")} />
            </div>
            <div>
              <Label>Foto (URL)</Label>
              <Input {...register("foto")} />
            </div>
          </div>

          <div>
            <Label>Marca</Label>
            <div className="flex items-center gap-2">
              <Select onValueChange={handleMarcaChange} defaultValue={produto?.marca?.id?.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
                <SelectContent>
                  {marcas.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMarca onNovaMarca={(nome) => console.log(nome)} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {produto ? "Salvar alterações" : "Criar produto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
