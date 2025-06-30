export interface Marca {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  estoque: number;
  volumeMl: number;
  foto: string;
  marca: Marca;
}
