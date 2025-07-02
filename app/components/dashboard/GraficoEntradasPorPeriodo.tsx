"use client";

interface EntradaProduto {
  data: string; // yyyy-mm-dd
  quantidade: number;
}

export function GraficoEntradasPorPeriodo({ entradas }: { entradas: EntradaProduto[] }) {
  const dias = entradas.map((e) =>
    new Date(e.data).toLocaleDateString("pt-BR", { weekday: "short" })
  );

  const max = Math.max(...entradas.map((e) => e.quantidade));

  // Garante altura mínima de 4px mesmo para valores pequenos
  const alturas = entradas.map((e) => {
    const porcentagem = (e.quantidade / max) * 100;
    return Math.max(porcentagem, 5);
  });

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-1">Entradas por Período</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Sua entrada de produtos nos últimos dias
      </p>

      <div className="relative h-40 w-full flex items-end gap-2">
        {alturas.map((altura, i) => (
          <div key={i} className="relative flex-1 flex justify-center items-end">
            <div
              className="w-1 rounded-full bg-emerald-500"
              style={{ height: `${altura}%`, transition: "height 0.3s ease-in-out" }}
            />
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full absolute"
              style={{ bottom: `calc(${altura}% - 5px)` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        {dias.map((dia, i) => (
          <span key={i}>{dia}</span>
        ))}
      </div>
    </div>
  );
}
