"use client";

import { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import { Produto } from "../../produtos/types/ProdutoItf";

export function GraficoEstoquePorCategoria({ produtos }: { produtos: Produto[] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);

  const dadosPorCategoria = produtos.reduce<Record<string, number>>((acc, produto) => {
    acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.estoque;
    return acc;
  }, {});

  const dataChart = Object.entries(dadosPorCategoria).map(([categoria, estoque]) => ({
    x: categoria,
    y: estoque,
  }));

  if (dataChart.length === 0) return null;

  const colorScaleLight = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#c084fc"];
  const colorScaleDark = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"];

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-center text-foreground">
        Estoque por Categoria
      </h2>
      <div className="h-[400px]">
        <VictoryPie
          data={dataChart}
          colorScale={isDarkMode ? colorScaleDark : colorScaleLight}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          style={{
            labels: {
              fill: isDarkMode ? "#f1f5f9" : "#0f172a", // texto adaptado ao modo
              fontSize: 14,
              fontWeight: "bold",
            },
          }}
          padding={{ top: 40, bottom: 40, left: 60, right: 60 }}
        />
      </div>
    </div>
  );
}
