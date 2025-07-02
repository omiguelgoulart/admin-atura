'use client';

import { useAuthStore } from "../login/stores/authStore";
import { LogOut } from "lucide-react";



export function Deslogar() {
  const { logout } = useAuthStore();

  return (
    <div>
      <button onClick={logout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sair</span>
          
      </button>
    </div>
  );
}
