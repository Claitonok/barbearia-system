'use client';

import { HeaderHome } from "@/components/Header";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modelo, setModelo] = useState("");
  const [dataHora, setDataHora] = useState("");


  function gerarLinkWhatsApp() {
    const numeroBarbearia = "+5513997290816"; // seu número

    const mensagem = `
💈 Barbearia

Olá! ${nome}

Seu agendamento foi confirmado:
📅 ${dataHora}
📞 Telefone: +55${telefone}
✂️ Serviço: ${modelo}

Nos vemos lá!
`;

    return `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!nome || !telefone || !dataHora || !modelo) {
      toast.error("Preencha todos os campos! ❌");
      return;
    }
    setTimeout(() => {
      toast.success("Link gerado! Abrindo WhatsApp...");
      alert("Link gerado! Abrindo WhatsApp..." + telefone);
      const link = gerarLinkWhatsApp();
      window.open(link, "_blank");
    }, 1500);
  }

  // Função que aplica a máscara de telefone
  const formatPhone = (value: string) => {
    if (!value) return "";
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, "");
    // (11) 99999-9999
    if (value.length <= 15) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (value.length >= 16) {
      toast.error("Número de telefone muito longo! ❌");
    }
    return value;
  };


  return (
    <div className="min-h-screen">

      <HeaderHome />

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-20 mt-10 border-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Bem-vindo ao sistema de barbearia!
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Agende seu horário em poucos segundos.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="mb-6 text-xl font-semibold">Novo Agendamento</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* NOME */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nome completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
                />
              </div>

              {/* TELEFONE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Telefone</label>
                <input
                  type="tel"
                  value={telefone}
                  maxLength={15}
                  onChange={(e) => setTelefone(formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
                />
              </div>

              {/* SELECT MODELO */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Modelo</label>
                <select
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
                >
                  <option className="text-black" >Selecione um modelo</option>
                  <option className="text-black" value={35} >Corte | R$35,00</option>
                  <option className="text-black" value={10} >Barba | R$10,00</option>
                  <option className="text-black" value={45} >Corte e Barba | R$45,00</option>
                </select>
              </div>

              {/* DATA */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-medium">Data e Horário</label>
                <input
                  type="datetime-local"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                  className="
      w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-2.5 text-sm outline-none transition 
      focus:ring-2 focus:ring-blue-500 dark:border-zinc-700
      
      /* Ajuste para o ícone do calendário */
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:rounded-md
      [&::-webkit-calendar-picker-indicator]:p-1
      [&::-webkit-calendar-picker-indicator]:invert-[0.5]
      dark:[&::-webkit-calendar-picker-indicator]:invert
      hover:[&::-webkit-calendar-picker-indicator]:bg-zinc-100
      dark:hover:[&::-webkit-calendar-picker-indicator]:bg-zinc-800
    "
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">

              <button
                type="reset"
                onClick={() => {
                  setNome("");
                  setTelefone("");
                  setModelo("");
                  setDataHora("");
                }}
                className="rounded-lg px-6 py-2.5 text-sm bg-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Limpar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-green-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600"
              >
                Confirmar via WhatsApp
              </button>

            </div>
          </form>
        </div>
      </main>

      <footer className="border-t mt-15 border-zinc-200 py-6 dark:border-zinc-800">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Nexora Systems. All rights reserved.
        </p>
      </footer>

    </div>
  );
}