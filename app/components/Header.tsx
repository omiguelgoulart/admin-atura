"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      {/* Esquerda: Título */}
      <h1 className="text-xl font-semibold">Painel do Admin</h1>

      {/* Direita: Navegação + Menu + Logout */}
      <div className="flex items-center gap-6">
        {/* Navegação para desktop */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
          <Link href="/produtos" className="hover:text-foreground transition">Produtos</Link>
          <Link href="/avaliacao" className="hover:text-foreground transition">Avaliações</Link>
        </nav>

        {/* Menu lateral para mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="mt-8 space-y-2">
              {["Dashboard", "Produtos", "Avaliações"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded hover:bg-muted text-sm font-medium text-muted-foreground"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive transition"
          title="Sair"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sair</span>
        </button>
      </div>
    </header>
  );
}
