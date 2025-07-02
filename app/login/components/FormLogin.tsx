"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginData {
  email: string;
  senha: string;
}

interface CadastroData extends LoginData {
  nome: string;
}

type FormData = LoginData | CadastroData;

interface FormLoginProps {
  tipo: "login" | "cadastro" | "recuperar";
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean; // ✅ Adiciona esta linha
}


export default function FormLogin({ tipo, onSubmit }: FormLoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = tipo === "cadastro"
  ? { nome, email, senha, tipo: "admin" }
  : { email, senha, tipo: "admin" }; // 👈 adiciona tipo aqui
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {tipo === "cadastro" && (
        <Input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      )}

      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {tipo !== "recuperar" && (
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      )}

      <Button type="submit" className="w-full">
        {tipo === "login"
          ? "Entrar"
          : "Recuperar Senha"}
      </Button>
    </form>
  );
}
