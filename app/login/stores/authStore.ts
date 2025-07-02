import { create } from "zustand";
import { toast } from "sonner";



// Tipo usado no login, cadastro e redefinição de senha
export type AuthData = {
  email: string;
  senha: string;
  tipo?: string; // Adiciona a propriedade 'tipo' como opcional
  codigo?: string; // Para redefinição de senha
};

// Representa o usuário autenticado
type User = {
  id: string;
  nome: string;
    email: string;
  };

// Definição do estado e ações da store
type AuthStore = {
  isLoading: boolean; // controle de carregamento
  error: string | null; // erro atual
  user: User | null; // dados do usuário logado

  // Ações
  login: (data: AuthData) => Promise<void>;
  cadastro: (data: AuthData) => Promise<void>;
  recuperarSenha: (data: Pick<AuthData, "email">) => Promise<void>;
  redefinirSenha: (data: Required<AuthData>) => Promise<void>;

  logout: () => void; // limpa estado e cookie
  setError: (msg: string | null) => void; // define erro manualmente
  setUser: (user: AuthStore["user"]) => void; // define usuário manualmente
};

// Criação da store com Zustand
export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  error: null,
  user: null,

  

  // 🔐 Login do usuário
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

      const userData = {
        id: result.id,
        nome: result.nome,
        email: result.email,
      };

      set({ user: userData });

      // Salva os dados do admin no cookie (visível no client)
      document.cookie = `admin=${encodeURIComponent(JSON.stringify(userData))}; path=/;`;

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

  // 👤 Cadastro de novo admin
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

      const userData = {
        id: result.id,
        nome: result.nome,
        email: result.email,
      };

      set({ user: userData });

      // Salva no cookie
      document.cookie = `admin=${encodeURIComponent(JSON.stringify(userData))}; path=/;`;

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

  // 📧 Envia código de recuperação de senha para o e-mail
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

  // 🔁 Redefine a senha com código
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

  // 🚪 Logout: limpa o estado e remove o cookie
  logout: () => {
    set({ user: null });
    document.cookie = `admin=; Max-Age=0; path=/;`;
    toast.success("Logout realizado com sucesso!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  },

  // 🔧 Define erro manualmente
  setError: (msg) => set({ error: msg }),

  // 👤 Define usuário manualmente
  setUser: (user) => set({ user }),
}));
