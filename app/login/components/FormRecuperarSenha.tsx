"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FormData = {
  email: string;
  codigo: string;
  senha: string;
};

interface Props {
  emailFromQuery?: string; // ✅ agora é opcional
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}


export default function FormRecuperSenha({  emailFromQuery,  onSubmit,  isSubmitting,}: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

useEffect(() => {
  if (emailFromQuery) {
    setValue("email", emailFromQuery);
  }
}, [emailFromQuery, setValue]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="codigo">Código</Label>
        <Input
          id="codigo"
          type="text"
          placeholder="Digite o código recebido"
          {...register("codigo", {
            required: "O código é obrigatório",
            minLength: {
              value: 4,
              message: "O código deve ter pelo menos 4 dígitos",
            },
          })}
        />
        {errors.codigo && (
          <p className="text-sm text-destructive">{errors.codigo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          disabled
          {...register("email", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Nova Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="********"
          {...register("senha", {
            required: "A senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          })}
        />
        {errors.senha && (
          <p className="text-sm text-destructive">{errors.senha.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
      </Button>
    </form>
  );
}
