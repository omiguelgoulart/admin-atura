import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";


type RespostaFormData = {
  mensagem: string;
  adminId: string; // Campo oculto para o ID do administrador
  avaliacaoId: number; // ID da avaliação que está sendo respondida
};

interface ResponderAvaliacaoDialogProps {
  avaliacaoId: number;
  produtoNome: string;
  onResponseSuccess?: () => void;
}

export function ResponderAvaliacao({
  avaliacaoId,
  produtoNome,
  onResponseSuccess,
}: ResponderAvaliacaoDialogProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RespostaFormData>({})
   
  // Buscar admin do contexto e registrar no formulário
  useEffect(() => {
    if (user && user.id) {
      setValue("adminId", String(user.id));
    }
    setValue("avaliacaoId", avaliacaoId);
  }, [user, avaliacaoId, setValue]);


  const onSubmit = async (data: RespostaFormData) => {
    console.log("Dados do formulário:", data);
    if (!data.adminId) {
      toast.error("Admin ID não encontrado. Por favor, faça login novamente.");
      console.error("Admin ID não encontrado:", data.adminId);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/respostas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mensagem: data.mensagem,
            adminId: data.adminId,
            avaliacaoId, // Envia o avaliacaoId no corpo da requisição
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro ao criar resposta");
      }

      toast.success("Resposta enviada com sucesso!");
      reset();
      setOpen(false);
      if (onResponseSuccess) onResponseSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Erro ao enviar resposta: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Responder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Responder avaliação de &quot;{produtoNome}&quot;
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("avaliacaoId")} />
            {errors.avaliacaoId && (
              <p className="text-sm text-red-500">{errors.avaliacaoId.message}</p>
            )}

          <Textarea
            placeholder="Digite sua resposta aqui..."
            {...register("mensagem")}
            rows={5}
          />
          {errors.mensagem && (
            <p className="text-sm text-red-500">{errors.mensagem.message}</p>
          )}

          {/* Campo oculto para adminId */}
          <input type="hidden" {...register("adminId")} />
          {errors.adminId && (
            <p className="text-sm text-red-500">{errors.adminId.message}</p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
