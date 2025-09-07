"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("E-mail obrigatório"),
  password: z.string().min(4, "Senha obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function LoginClientePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [error, setError] = React.useState("");

  async function onSubmit(data: FormData) {
    setError("");
    try {
      const res = await fetch("/api/clientes/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result?.error || "Usuário ou senha inválidos.");
        return;
      }
      // Salva token e dados do cliente no localStorage
      localStorage.setItem("@token_xmaster", result.token);
      localStorage.setItem("cliente", JSON.stringify(result.cliente));
      window.location.href = "/checkout";
    } catch (err) {
      setError("Erro ao fazer login.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-[600px] w-full mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <h1 className="text-2xl font-bold mb-6">Login do Cliente</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-600 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
          <div className="flex flex-col items-center gap-2 mt-4 text-sm">
            <a href="/cadastro" className="text-blue-700 hover:underline">
              Ainda não tem cadastro? Cadastre-se
            </a>
            <a
              href="/recuperar-senha"
              className="text-blue-700 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
