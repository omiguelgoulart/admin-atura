"use client";
import { useEffect } from "react";
import { useProdutos } from "@/app/produtos/stores/useProdutos";
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  estoque: number;
}

function GraficoEstoquePorCategoria({ produtos }: { produtos: Produto[] }) {
  const dadosPorCategoria = produtos.reduce<Record<string, number>>((acc, produto) => {
    acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.estoque;
    return acc;
  }, {});

  const dataChart = Object.entries(dadosPorCategoria).map(([categoria, estoque]) => ({
    x: categoria,
    y: estoque,
  }));

  if (dataChart.length === 0) {
    return null;
  }

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Estoque por Categoria</h2>
      <div style={{ height: 400 }}>
        <VictoryPie
          data={dataChart}
          colorScale={["#4ade80", "#60a5fa", "#facc15", "#f87171"]}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          style={{ labels: { fill: "#333", fontSize: 14, fontWeight: "bold" } }}
          padding={{ top: 40, bottom: 40, left: 60, right: 60 }}
        />
      </div>
    </div>
  );
}

function GraficoTopProdutosEstoque({ produtos }: { produtos: Produto[] }) {
  const produtosOrdenados = [...produtos]
    .sort((a, b) => b.estoque - a.estoque)
    .slice(0, 5);

  const dataChart = produtosOrdenados.map(produto => ({
    x: produto.nome.length > 15 ? `${produto.nome.substring(0, 15)}...` : produto.nome,
    y: produto.estoque,
  }));

  if (dataChart.length === 0) {
    return null;
  }

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Top 5 Produtos com Mais Estoque</h2>
      <div style={{ height: 400 }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          padding={{ top: 20, bottom: 60, left: 50, right: 40 }}
        >
          <VictoryAxis style={{ tickLabels: { fontSize: 10, angle: -40, textAnchor: 'end' } }} />
          <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
          <VictoryBar
            data={dataChart}
            style={{ data: { fill: "#60a5fa" } }}
            labels={({ datum }) => datum.y}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { produtos, carregarProdutos, loading } = useProdutos();

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  if (loading) {
    return <p className="p-6 text-center text-lg">Carregando dashboard...</p>;
  }



  if (produtos.length === 0) {
    return <p className="p-6 text-center text-lg">Nenhum produto encontrado para exibir.</p>;
  }

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard de Controle de Estoque</h1>
        <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full lg:w-5/12">
                <GraficoEstoquePorCategoria produtos={produtos} />
            </div>
            <div className="w-full lg:w-5/12">
                <GraficoTopProdutosEstoque produtos={produtos} />
            </div>
        </div>
    </div>
  );
}