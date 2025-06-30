"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onNovaMarca: (nome: string) => void;
}

export function FormMarca({ onNovaMarca }: Props) {
  const [nome, setNome] = useState("");

  const handleAddMarca = () => {
    if (!nome.trim()) return;
    onNovaMarca(nome);
    setNome("");
    toast.success("Marca adicionada!");
  };

  return (
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
  );
}
