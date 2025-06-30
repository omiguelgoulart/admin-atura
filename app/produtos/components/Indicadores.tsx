import { PackageSearch, Boxes, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useProdutos } from "../stores/useProdutos";

export function Indicadores() {
  const { produtos, carregarProdutos } = useProdutos();

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const produtosComEstoqueBaixo = produtos.filter((p) => p.estoque < 5).length;
  const totalProdutos = produtos.length;
  const custoTotal = produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0);

  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
          <PackageSearch className="h-5 w-5" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {produtosComEstoqueBaixo}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Total de Produtos
          </CardTitle>
          <Boxes className="h-5 w-5" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {totalProdutos}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Valor Total em Estoque
          </CardTitle>
          <DollarSign className="h-5 w-5" />
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {formatarValor(custoTotal)}
        </CardContent>
      </Card>
    </div>
  );
}
