"use client";

import AvaliacaoCard from "./components/AvaliacaoCard";
import { useAvaliacoes } from "./stores/useAvaliacoes";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AvaliacoesPage() {
  const {
    avaliacoes,
    carregarAvaliacoes,
    excluirAvaliacao,
    erro,
    loading,
  } = useAvaliacoes();

  useEffect(() => {
    carregarAvaliacoes();
  }, [carregarAvaliacoes]);

  const handleDelete = async (id: number) => {
    await excluirAvaliacao(id);
    if (erro) toast.error(erro);
    else toast.success("Avaliação excluída");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Avaliações dos Produtos</h1>

      {loading && <p>Carregando...</p>}

      {!loading && avaliacoes.length === 0 && (
        <p>Nenhuma avaliação encontrada.</p>
      )}

      {!loading && avaliacoes.length > 0 && (
        <div className="space-y-4">
          {avaliacoes.map((avaliacao) => (
            <AvaliacaoCard
              key={avaliacao.id}
              avaliacao={avaliacao}
              onDelete={() => handleDelete(avaliacao.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
