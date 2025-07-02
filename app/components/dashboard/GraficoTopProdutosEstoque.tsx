"use client";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory";
import { Produto } from "../../produtos/types/ProdutoItf";

export function GraficoTopProdutosEstoque({ produtos }: { produtos: Produto[] }) {
  const produtosOrdenados = [...produtos]
    .sort((a, b) => b.estoque - a.estoque)
    .slice(0, 5);

  const dataChart = produtosOrdenados.map((produto) => ({
    x: produto.nome.length > 15 ? `${produto.nome.substring(0, 15)}...` : produto.nome,
    y: produto.estoque,
  }));

  if (dataChart.length === 0) return null;

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-center text-foreground">
        Top 5 Produtos com Mais Estoque
      </h2>
      <div className="h-[400px]">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          padding={{ top: 20, bottom: 60, left: 50, right: 40 }}
        >
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 10,
                angle: -40,
                textAnchor: "end",
                fill: "#0f172a", // slate-900
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}`}
            style={{
              tickLabels: { fill: "#0f172a" },
              axis: { stroke: "#e5e7eb" },
              grid: { stroke: "#e5e7eb", strokeDasharray: "4" },
            }}
          />
          <VictoryBar
            data={dataChart}
            labels={({ datum }) => datum.y}
            animate={{ duration: 1500 }}
            style={{
              data: { fill: "#60a5fa" }, // azul-400 (pode trocar pela sua cor primária)
              labels: { fill: "#0f172a", fontWeight: "bold" },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}
