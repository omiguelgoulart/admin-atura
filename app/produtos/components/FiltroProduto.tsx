"use client";

import { useEffect, useState } from "react";
import { useMarcas } from "../stores/useMarcas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Filtros {
  marcaId?: string;
  categoria?: string;
  precoMin?: string;
  precoMax?: string;
}

interface Props {
  onFiltrar: (filtros: Filtros) => void;
  onLimpar: () => void;
}

export function FiltroProduto({ onFiltrar }: Props) {
  const { marcas, carregarMarcas } = useMarcas();
  const [filtros, setFiltros] = useState<Filtros>({});

  useEffect(() => {
    carregarMarcas();
  }, [carregarMarcas]);

  const aplicarFiltros = () => {
    const filtrosTratados = {
      ...filtros,
      marcaId: filtros.marcaId === "all" ? undefined : filtros.marcaId,
      categoria: filtros.categoria === "all" ? undefined : filtros.categoria,
    };
    onFiltrar(filtrosTratados);
  };

  const limparFiltros = () => {
    setFiltros({});
    onFiltrar({});
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 items-end p-2 rounded-md">
        {/* Marca */}
        <div className="flex flex-col w-[140px]">
          <label className="text-sm font-medium mb-1">Marca</label>
          <Select
            value={filtros.marcaId}
            onValueChange={(val) => setFiltros({ ...filtros, marcaId: val })}
          >
            <SelectTrigger>
              <span className="text-muted-foreground text-sm">
                {filtros.marcaId
                  ? marcas.find((m) => String(m.id) === filtros.marcaId)?.nome
                  : "Todos"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {marcas.map((marca) => (
                <SelectItem key={marca.id} value={String(marca.id)}>
                  {marca.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Categoria */}
        <div className="flex flex-col w-[140px]">
          <label className="text-sm font-medium mb-1">Categoria</label>
          <Select
            value={filtros.categoria}
            onValueChange={(val) => setFiltros({ ...filtros, categoria: val })}
          >
            <SelectTrigger>
              <span className="text-muted-foreground text-sm">
                {filtros.categoria || "Todos"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Masculino">Masculino</SelectItem>
              <SelectItem value="Feminino">Feminino</SelectItem>
              <SelectItem value="Unissex">Unissex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preço mínimo */}
        <div className="flex flex-col w-[100px]">
          <label className="text-sm font-medium mb-1">Preço mín</label>
          <Input
            type="number"
            placeholder="0"
            className="text-sm"
            value={filtros.precoMin ?? ""}
            onChange={(e) => setFiltros({ ...filtros, precoMin: e.target.value })}
          />
        </div>

        {/* Preço máximo */}
        <div className="flex flex-col w-[100px]">
          <label className="text-sm font-medium mb-1">Preço máx</label>
          <Input
            type="number"
            placeholder="999"
            className="text-sm"
            value={filtros.precoMax ?? ""}
            onChange={(e) => setFiltros({ ...filtros, precoMax: e.target.value })}
          />
        </div>

        {/* Botões */}
        <div className="flex gap-2 mt-2">
          <Button onClick={aplicarFiltros} className="h-9 px-4 text-sm">
            Aplicar
          </Button>
          <Button
            variant="outline"
            onClick={limparFiltros}
            className="h-9 px-4 text-sm"
          >
            Limpar
          </Button>
        </div>
      </div>
      <div className="w-full border-t border-zinc-200 " />
    </>
  );
}
