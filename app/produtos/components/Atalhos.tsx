import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function Atalhos() {
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Link href="/produtos/lista">
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Gerenciar e visualizar os produtos cadastrados.
            </CardContent>
          </Card>
        </Link>

        <Link href="/produtos/entradas">
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle>Entradas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Registrar e acompanhar novas entradas de estoque.
            </CardContent>
          </Card>
        </Link>

        <Link href="/produtos/saidas">
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle>Saídas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Gerenciar baixas e saídas de produtos.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
