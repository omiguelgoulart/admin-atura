"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormLogin from "./components/FormLogin";
import FormRecuperarSenha from "./components/FormRecuperarSenha";
import { useAuthStore } from "./stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Agora só existem duas opções: login ou recuperar
type FormType = "login" | "recuperar";

export default function LoginPage() {
  const [formType, setFormType] = useState<FormType>("login");
  const router = useRouter();

  const { login, recuperarSenha, isLoading, setError } = useAuthStore();

const handleLogin = async (data: { email: string; senha: string }) => {
  await login({ ...data, tipo: "admin" }); // adiciona tipo dinamicamente
  const err = useAuthStore.getState().error;
  if (!err) {
    toast.success("Login realizado com sucesso!");
    router.push("/");
  } else {
    toast.error(err);
    setError(null);
  }
};


const handleRecuperarSenha = async (data: { email: string }) => {
  await recuperarSenha(data); // aqui, recuperarSenha espera só email
  const err = useAuthStore.getState().error;
  if (!err) {
    toast.success("Código enviado para o e-mail!");
    router.push(`/nova-senha?email=${encodeURIComponent(data.email)}`);
  } else {
    toast.error(err);
    setError(null);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">
            {formType === "login" ? "Acessar conta" : "Recuperar senha"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {formType === "login" && (
            <FormLogin
              tipo="login"
              onSubmit={handleLogin}
              isSubmitting={isLoading}
            />
          )}

          {formType === "recuperar" && (
            <FormRecuperarSenha
              onSubmit={handleRecuperarSenha}
              isSubmitting={isLoading}
            />
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          {formType === "login" && (
            <button
              onClick={() => setFormType("recuperar")}
              className="text-primary hover:underline"
            >
              Esqueci minha senha
            </button>
          )}

          {formType === "recuperar" && (
            <button
              onClick={() => setFormType("login")}
              className="text-primary hover:underline"
            >
              Voltar para login
            </button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
