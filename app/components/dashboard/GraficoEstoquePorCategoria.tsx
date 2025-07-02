"use client";

import { VictoryPie } from "victory";
import { Produto } from "../../produtos/types/ProdutoItf";

export function GraficoEstoquePorCategoria({ produtos }: { produtos: Produto[] }) {
  const dadosPorCategoria = produtos.reduce<Record<string, number>>((acc, produto) => {
    acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.estoque;
    return acc;
  }, {});

  const dataChart = Object.entries(dadosPorCategoria).map(([categoria, estoque]) => ({
    x: categoria,
    y: estoque,
  }));

  if (dataChart.length === 0) return null;

  // Cores fixas baseadas em tons do Tailwind/ShadCN
  const colorScale = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#c084fc"];

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-center text-foreground">
        Estoque por Categoria
      </h2>
      <div className="h-[400px]">
        <VictoryPie
          data={dataChart}
          colorScale={colorScale}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          style={{
            labels: {
              fill: "#0f172a", // slate-900 - pode ajustar dinamicamente se quiser
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
