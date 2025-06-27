export interface RespostaAvaliacao {
  id: number;
  mensagem: string;
  respondidoEm: string;
  admin?: {
    nome: string;
  };
}

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  date: string;
  cliente: {
    nome: string;
  };
  produto: {
    nome: string;
  };
  respostas?: RespostaAvaliacao[]; // ✅ novo campo opcional
}
