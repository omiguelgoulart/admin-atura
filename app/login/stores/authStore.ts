import { create } from "zustand";
import { toast } from "sonner";

type AuthData = {
  nome?: string;
  email: string;
  senha: string;
  codigo?: string;
};

type AuthStore = {
  isLoading: boolean;
  error: string | null;
  user: { nome: string; email: string } | null;

  login: (data: AuthData) => Promise<void>;
  cadastro: (data: AuthData) => Promise<void>;
  recuperarSenha: (data: Pick<AuthData, "email">) => Promise<void>;
  redefinirSenha: (data: Required<AuthData>) => Promise<void>;

  setError: (msg: string | null) => void;
  setUser: (user: AuthStore["user"]) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  error: null,
  user: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro no login");

      set({ user: { nome: result.nome, email: result.email } });
      toast.success("Login realizado com sucesso!");
    } catch (err: unknown) {
      console.error("Erro no login:", err);
      if (err instanceof Error) {
        set({ error: err.message });
        toast.error(err.message);
      } else {
        set({ error: "Erro desconhecido" });
        toast.error("Erro desconhecido");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  cadastro: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro no cadastro");

      set({ user: { nome: result.nome, email: result.email } });
      toast.success("Cadastro realizado com sucesso!");
    } catch (err: unknown) {
      console.error("Erro no cadastro:", err);
      if (err instanceof Error) {
        set({ error: err.message });
        toast.error(err.message);
      } else {
        set({ error: "Erro desconhecido" });
        toast.error("Erro desconhecido");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  recuperarSenha: async ({ email }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/login/envia-codigo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro ao enviar código");

      toast.success("Código enviado para o e-mail!");
    } catch (err: unknown) {
      console.error("Erro ao recuperar senha:", err);
      if (err instanceof Error) {
        set({ error: err.message });
        toast.error(err.message);
      } else {
        set({ error: "Erro desconhecido" });
        toast.error("Erro desconhecido");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  redefinirSenha: async ({ email, codigo, senha }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/login/recupera-senha`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, codigo, senha }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro ao redefinir senha");

      toast.success("Senha redefinida com sucesso!");
    } catch (err: unknown) {
      console.error("Erro ao redefinir senha:", err);
      if (err instanceof Error) {
        set({ error: err.message });
        toast.error(err.message);
      } else {
        set({ error: "Erro desconhecido" });
        toast.error("Erro desconhecido");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  setError: (msg) => set({ error: msg }),
  setUser: (user) => set({ user }),
}));
