// src/lib/auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * Função helper para pegar a sessão em qualquer lugar do backend,
 * incluindo server components, API routes e ações do servidor.
 */
export function auth() {
  return getServerSession(authOptions);
}
