import { create } from "zustand";
import { toast } from "sonner";

export interface Marca {
  id: number;
  nome: string;
}

type MarcaStore = {
  marcas: Marca[];
  carregarMarcas: () => Promise<void>;
  criarMarca: (nome: string) => Promise<void>;
  excluirMarca: (id: number) => Promise<void>;
  editarMarca: (id: number, nome: string) => Promise<void>;
};

export const useMarcas = create<MarcaStore>((set) => ({
  marcas: [],
  
  carregarMarcas: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`);
      const data = await res.json();
      set({ marcas: data });
    } catch (err) {
      console.error("Erro ao carregar marcas:", err);
      toast.error("Erro ao carregar marcas");
    }
  },

  criarMarca: async (nome) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      if (!res.ok) throw new Error("Erro ao criar marca");

      const novaMarca = await res.json();
      set((state) => ({ marcas: [...state.marcas, novaMarca] }));
      toast.success("Marca criada com sucesso");
    } catch (err) {
      console.error("Erro ao criar marca:", err);
      toast.error("Erro ao criar marca");
    }
  },

    excluirMarca: async (id) => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas/${id}`, {
            method: "DELETE",
        });
    
        if (!res.ok) throw new Error("Erro ao excluir marca");
    
        set((state) => ({
            marcas: state.marcas.filter((marca) => marca.id !== id),
        }));
        toast.success("Marca excluída com sucesso");
        } catch (err) {
        console.error("Erro ao excluir marca:", err);
        toast.error("Erro ao excluir marca");
        }
    },

    editarMarca: async (id, nome) => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
        });
    
        if (!res.ok) throw new Error("Erro ao editar marca");
    
        const marcaAtualizada = await res.json();
        set((state) => ({
            marcas: state.marcas.map((marca) =>
                marca.id === id ? marcaAtualizada : marca
            ),
        }));
        toast.success("Marca editada com sucesso");
        } catch (err) {
        console.error("Erro ao editar marca:", err);
        toast.error("Erro ao editar marca");
        }
    }
}));
