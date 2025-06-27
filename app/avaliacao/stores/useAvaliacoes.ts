import { create } from "zustand";

export interface RespostaAvaliacao {
  id: number;
  mensagem: string;
  respondidoEm: string;
  admin?: {
    nome: string;
  };
}

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  date: string;
  cliente: {
    nome: string;
  };
  produto: {
    nome: string;
  };
  respostas?: RespostaAvaliacao[];
}

type AvaliacaoStore = {
  avaliacoes: Avaliacao[];
  loading: boolean;
  erro: string | null;

  carregarAvaliacoes: () => Promise<void>;
  excluirAvaliacao: (id: number) => Promise<void>;
  responderAvaliacao: (avaliacaoId: number, mensagem: string) => Promise<void>;
};

export const useAvaliacoes = create<AvaliacaoStore>((set, get) => ({
  avaliacoes: [],
  loading: false,
  erro: null,

  carregarAvaliacoes: async () => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes`);

      if (!res.ok) throw new Error("Erro ao carregar avaliações");
      const data = await res.json();

      set({ avaliacoes: data });
    } catch {
      set({ erro: "Erro ao carregar avaliações" });
    } finally {
      set({ loading: false });
    }
  },

  excluirAvaliacao: async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir");

      set({
        avaliacoes: get().avaliacoes.filter((a) => a.id !== id),
      });
    } catch {
      set({ erro: "Erro ao excluir avaliação" });
    }
  },

  responderAvaliacao: async (avaliacaoId, mensagem) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/respostas/${avaliacaoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensagem }),
      });

      if (!res.ok) throw new Error("Erro ao responder");

      // Recarrega as avaliações atualizadas com novas respostas
      await get().carregarAvaliacoes();
    } catch {
      set({ erro: "Erro ao responder avaliação" });
    }
  },
}));
