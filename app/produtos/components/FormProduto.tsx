"use client";

import { useEffect } from "react";
import { Produto, CategoriaProduto } from "../types/ProdutoItf";
import { useForm } from "react-hook-form";
import { useMarcas } from "../stores/useMarcas";
import { useProdutos } from "../stores/useProdutos";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormMarca } from "./FormMarca";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto?: Produto;
}

type FormValues = {
  nome: string;
  categoria: CategoriaProduto; // <- mudou aqui
  descricao: string;
  preco: string;
  estoque: string;
  volumeMl?: string;
  foto?: string;
  marcaId?: string;
};


export function FormProduto({ open, onOpenChange, produto }: Props) {
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormValues>();
  const { marcas, carregarMarcas } = useMarcas();
  const { criarProduto, editarProduto } = useProdutos();

  useEffect(() => {
    carregarMarcas();
  }, [carregarMarcas]);

  useEffect(() => {
    if (produto) {
      reset({
        nome: produto.nome,
        categoria: produto.categoria,
        descricao: produto.descricao,
        preco: String(produto.preco),
        estoque: String(produto.estoque),
        volumeMl: produto.volumeMl ? String(produto.volumeMl) : "",
        foto: produto.foto ?? "",
        marcaId: produto.marca?.id ? String(produto.marca.id) : undefined,
      });
    } else {
      reset();
    }
  }, [produto, reset]);

const onSubmit = async (data: FormValues) => {
  console.log("Dados do formulário:", data);

  const marcaSelecionada = marcas.find((m) => String(m.id) === data.marcaId);
  if (!marcaSelecionada) {
    alert("Selecione uma marca");
    return;
  }

  const dados = {
    nome: data.nome,
    descricao: data.descricao,
    preco: Number(data.preco),
    categoria: data.categoria,
    estoque: Number(data.estoque),
    foto: data.foto ?? "",
    volumeMl: data.volumeMl ? Number(data.volumeMl) : 0,
    marcaId: Number(data.marcaId), // ✅ apenas isso é necessário
  };

  if (produto?.id) {
    await editarProduto(produto.id, dados);
  } else {
    await criarProduto(dados);
  }

  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{produto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Formulário para {produto ? "editar" : "cadastrar"} produto.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input {...register("nome", { required: true })} />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select
                value={watch("categoria")}
                onValueChange={(value) => setValue("categoria", value as CategoriaProduto)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASCULINO">Masculino</SelectItem>
                  <SelectItem value="FEMININO">Feminino</SelectItem>
                  <SelectItem value="INFANTIL">Infantil</SelectItem>
                  <SelectItem value="UNISSEX">Unissex</SelectItem>
                </SelectContent>
              </Select>
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
              <Select
                value={watch("marcaId")}
                onValueChange={(id) => setValue("marcaId", id)}
              >
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
