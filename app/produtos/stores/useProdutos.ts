import { create } from "zustand";
import { toast } from "sonner";
import { Produto } from "../types/ProdutoItf";

type ProdutoStore = {
  produtos: Produto[];
  loading: boolean;
  erro: string | null;

  carregarProdutos: () => Promise<void>;
  deletarProduto: (id: number) => Promise<void>;
  criarProduto: (produto: Omit<Produto, 'id'>) => Promise<void>;
  editarProduto: (id: number, produto: Omit<Produto, 'id'>) => Promise<void>;
};

export const useProdutos = create<ProdutoStore>((set, get) => ({
  produtos: [],
  loading: false,
  erro: null,

  carregarProdutos: async () => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar produtos");
      const data = await res.json();
      set({ produtos: data });
      toast.success("Produtos carregados com sucesso");
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      set({ erro: "Erro ao carregar produtos" });
      toast.error("Erro ao carregar produtos");
    } finally {
      set({ loading: false });
    }
  },

  deletarProduto: async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao excluir produto");

      const produtosAtualizados = get().produtos.filter((p) => p.id !== id);
      set({ produtos: produtosAtualizados });
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      set({ erro: "Erro ao excluir produto" });
      toast.error("Erro ao excluir produto");
    }
  },

  criarProduto: async (produto) => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
        body: JSON.stringify(produto),
      });

      if (!res.ok) throw new Error("Erro ao criar produto");
      const novoProduto = await res.json();
      set((state) => ({ produtos: [...state.produtos, novoProduto] }));
      toast.success("Produto criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      set({ erro: "Erro ao criar produto" });
      toast.error("Erro ao criar produto");
    } finally {
      set({ loading: false });
    }
  },

  editarProduto: async (id, produto) => {
    set({ loading: true, erro: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
        body: JSON.stringify(produto),
      });

      if (!res.ok) throw new Error("Erro ao editar produto");
      const produtoAtualizado = await res.json();
      set((state) => ({
        produtos: state.produtos.map((p) =>
          p.id === id ? produtoAtualizado : p
        ),
      }));
      toast.success("Produto editado com sucesso");
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      set({ erro: "Erro ao editar produto" });
      toast.error("Erro ao editar produto");
    } finally {
      set({ loading: false });
    }
  },
}));
