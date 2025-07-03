"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avaliacao } from "../types/AvaliacaoItf";
import { ResponderAvaliacao } from "./ResponderAvaliacao";

interface Props {
  avaliacao: Avaliacao;
  onDelete: () => void;
}

export default function AvaliacaoCard({ avaliacao, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{avaliacao.produto.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Cliente:</strong> {avaliacao.cliente.nome}</p>
        <p><strong>Nota:</strong> {avaliacao.nota}/5</p>
        {avaliacao.comentario && (
          <p><strong>Comentário:</strong> {avaliacao.comentario}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {new Date(avaliacao.date).toLocaleDateString()}
        </p>

        {avaliacao.respostas && avaliacao.respostas.length > 0 && (
          <div className="mt-4 space-y-2 bg-muted p-3 rounded-md">
            <p className="font-semibold text-sm text-muted-foreground">Respostas:</p>
            {avaliacao.respostas.map((resposta) => (
              <div key={resposta.id} className="text-sm border-l-2 pl-2 border-primary">
                <p>{resposta.mensagem}</p>
                <p className="text-xs text-muted-foreground">
                  {resposta.admin?.nome ? `por ${resposta.admin.nome}` : "Admin"} –{" "}
                  {new Date(resposta.respondidoEm).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <ResponderAvaliacao
            avaliacaoId={avaliacao.id}
            produtoNome={avaliacao.produto.nome}
          />
          <Button variant="destructive" onClick={onDelete}>Excluir</Button>
        </div>
      </CardContent>
    </Card>
  );
}
