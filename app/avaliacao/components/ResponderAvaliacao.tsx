"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAvaliacoes } from "../stores/useAvaliacoes";

interface Props {
  avaliacaoId: number;
  produtoNome: string;
}

export default function ResponderAvaliacao({ avaliacaoId, produtoNome }: Props) {
  const [resposta, setResposta] = useState("");
  const [open, setOpen] = useState(false);
  const responderAvaliacao = useAvaliacoes((state) => state.responderAvaliacao);

  const handleResponder = async () => {
    if (!resposta.trim()) {
      toast.error("Digite uma resposta.");
      return;
    }

    await responderAvaliacao(avaliacaoId, resposta);
    toast.success("Resposta enviada com sucesso!");

    setResposta("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Responder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Responder avaliação de &quot;{produtoNome}&quot;</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Digite sua resposta aqui..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleResponder}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
