"use client";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory";
import { Produto } from "../../produtos/types/ProdutoItf";
import { useEffect, useState } from "react";

export function GraficoTopProdutosEstoque({ produtos }: { produtos: Produto[] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);

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
                fill: isDarkMode ? "#f1f5f9" : "#0f172a", // texto eixo X
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}`}
            style={{
              tickLabels: { fill: isDarkMode ? "#f1f5f9" : "#0f172a" }, // texto eixo Y
              axis: { stroke: isDarkMode ? "#475569" : "#e5e7eb" },
              grid: {
                stroke: isDarkMode ? "#475569" : "#e5e7eb",
                strokeDasharray: "4",
              },
            }}
          />
          <VictoryBar
            data={dataChart}
            labels={({ datum }) => datum.y}
            animate={{ duration: 1500 }}
            style={{
              data: {
                fill: isDarkMode ? "#3b82f6" : "#60a5fa", // azul-500 (dark) / azul-400 (light)
              },
              labels: {
                fill: isDarkMode ? "#f1f5f9" : "#0f172a",
                fontWeight: "bold",
              },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}
