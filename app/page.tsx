"use client";

import { useEffect } from "react";
import { useProdutos } from "@/app/produtos/stores/useProdutos";
import { KPICards } from "@/app/components/dashboard/KPICards";
import { GraficoEstoquePorCategoria } from "@/app/components/dashboard/GraficoEstoquePorCategoria";
import { GraficoTopProdutosEstoque } from "@/app/components/dashboard/GraficoTopProdutosEstoque";
import { GraficoEntradasPorPeriodo } from "@/app/components/dashboard/GraficoEntradasPorPeriodo";
import { Indicadores } from "@/app/components/dashboard/Indicadores";



export default function DashboardPage() {
  const { produtos, carregarProdutos, loading } = useProdutos();

  const entradas = [
    { data: "2025-06-15", quantidade: 20 },
    { data: "2025-06-16", quantidade: 10 },
    { data: "2025-06-17", quantidade: 35 },
    { data: "2025-06-18", quantidade: 15 },
    { data: "2025-06-19", quantidade: 22 },
    { data: "2025-06-20", quantidade: 28 },
    { data: "2025-06-21", quantidade: 31 },
  ]


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

      {/* Indicadores */}
      <Indicadores produtos={produtos} />

      {/* KPIs */}
      <div className="mb-8">
      <KPICards produtos={produtos} />
      </div>


      {/* Gráficos */}
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full lg:w-5/12">
          <GraficoEstoquePorCategoria produtos={produtos} />
        </div>
        <div className="w-full lg:w-5/12">
          <GraficoTopProdutosEstoque produtos={produtos} />
        </div>
        <div className="w-full lg:w-10/12 mt-10">
          <GraficoEntradasPorPeriodo entradas={entradas} />
        </div>
      </div>
    </div>
  );
}
