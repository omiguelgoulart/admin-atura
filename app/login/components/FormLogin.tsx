"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Tipos
type LoginData = { email: string; senha: string };
type RecuperarData = { email: string };

type FormLoginProps<T> = {
  tipo: "login" | "recuperar";
  onSubmit: (data: T) => void;
  isSubmitting: boolean;
};

export default function FormLogin<T extends LoginData | RecuperarData>({
  tipo,
  onSubmit,
  isSubmitting,
}: FormLoginProps<T>) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipo === "login") {
      onSubmit({ email, senha } as T);
    } else {
      onSubmit({ email } as T);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {tipo === "login" && (
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Enviando..."
          : tipo === "login"
          ? "Entrar"
          : "Recuperar Senha"}
      </Button>
    </form>
  );
}
