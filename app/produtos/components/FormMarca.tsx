"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useMarcas } from "../stores/useMarcas";

interface Props {
  onNovaMarca?: (nome: string) => void;
}

export function FormMarca({ onNovaMarca }: Props) {
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { criarMarca, carregarMarcas } = useMarcas();

  const handleAddMarca = async () => {
    if (!nome.trim()) {
      setError("O nome da marca é obrigatório.");
      return;
    }

    try {
      setError(null);
      await criarMarca(nome);
      await carregarMarcas();
      setNome("");
      if (onNovaMarca) onNovaMarca(nome);
    } catch {
      toast.error("Erro ao adicionar a marca.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Nova marca"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button type="button" onClick={handleAddMarca}>
          Adicionar
        </Button>
      </div>
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
