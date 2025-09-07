"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CadastroClientePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const schema = z
    .object({
      name: z.string().min(2, "Nome obrigatório"),
      cpfCnpj: z.string().min(11, "CPF ou CNPJ obrigatório"),
      email: z.string().email("E-mail inválido").min(5, "E-mail obrigatório"),
      phone: z.string().min(10, "Telefone inválido"),
      city: z.string().min(2, "Cidade obrigatória"),
      address: z.string().min(5, "Endereço obrigatório"),
      addressNumber: z.string().min(1, "Número obrigatório"),
      complement: z.string().optional(),
      province: z.string().min(2, "Bairro obrigatório"),
      postalCode: z.string().min(8, "CEP inválido"),
      password: z.string().min(4, "Senha obrigatória"),
      confirmPassword: z.string().min(4, "Confirme a senha"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não conferem",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  // Monitora o campo CEP
  const postalCode = watch("postalCode");
  React.useEffect(() => {
    async function fetchAddress() {
      if (postalCode && postalCode.replace(/\D/g, "").length === 8) {
        try {
          const data = await getAddressByPostalCode(postalCode);
          setValue("address", data.street || "");
          setValue("province", data.neighborhood || "");
          setValue("city", data.city || "");
        } catch (err) {
          // Se erro, não preenche
        }
      }
    }
    fetchAddress();
  }, [postalCode, setValue]);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  async function getAddressByPostalCode(postalCode: string) {
    // Função para buscar dados do CEP na BrasilAPI
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${postalCode}`
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar endereço");
    }
    return response.json();
  }

  async function onSubmit(data: FormData) {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/asaas/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          password: data.password,
          city: data.city,
        }),
      });
      const result = await res.json();

      setSuccess(true);
      reset();
      if (redirect === "checkout") {
        router.push("/checkout");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setError(
        err?.error?.errors[0].description || "Erro ao cadastrar cliente."
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-[600px] mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <h1 className="text-2xl font-bold mb-6">Cadastro do Cliente</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-600 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              CPF ou CNPJ *
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("cpfCnpj")}
            />
            {errors.cpfCnpj && (
              <span className="text-red-600 text-xs">
                {errors.cpfCnpj.message}
              </span>
            )}
          </div>
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
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-600 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">CEP</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <span className="text-red-600 text-xs">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Rua</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-red-600 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Número</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("addressNumber")}
              />
              {errors.addressNumber && (
                <span className="text-red-600 text-xs">
                  {errors.addressNumber.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Complemento
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("complement")}
              />
              {errors.complement && (
                <span className="text-red-600 text-xs">
                  {errors.complement.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex-2">
              <label className="block text-sm font-medium mb-1">Bairro</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("province")}
              />
              {errors.province && (
                <span className="text-red-600 text-xs">
                  {errors.province.message}
                </span>
              )}
            </div>
            <div className="flex-2">
              <label className="block text-sm font-medium mb-1">Cidade</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("city")}
              />
              {errors.city && (
                <span className="text-red-600 text-xs">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha *</label>
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirme a senha *
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm mb-2">
              Cadastro realizado com sucesso!
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
          >
            {isSubmitting ? "Salvando..." : "Cadastrar"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
