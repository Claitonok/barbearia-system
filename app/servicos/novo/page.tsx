'use client';

import { agendamentoHorario } from "@/api/auth/route";
import { HeaderGlobal } from "@/components/Header";
import { useState } from "react";
import { toast } from "sonner";

export default function NovoAgendamento() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataAgendamento, setDataHora] = useState("");
  const [valorParaEnviar, setValorParaEnviar] = useState("");
  
  const valor = Number(valorParaEnviar);

  function gerarLinkWhatsApp() {
    const numeroBarbearia = "+5513997290816";
    const mensagem = `
*Barbearia*\n
Olá, *${nome}* \n
Seu agendamento foi solicitado:\n
 *Data:* ${new Date(dataAgendamento).toLocaleString('pt-BR')}\n
 *Contato:* ${telefone}\n
 *Serviço:* R$ ${valor},00

Nos vemos lá!
`;
    return `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!nome || !telefone || !dataAgendamento || !valorParaEnviar) {
      toast.error("Preencha todos os campos! ❌");
      return;
    }

    const promise = async () => {
      await agendamentoHorario({ nome, telefone, valor, dataAgendamento });
      const link = gerarLinkWhatsApp();
      window.open(link, "_blank");
      return "Agendamento registrado!";
    };

    toast.promise(promise, {
      loading: 'Salvando agendamento...',
      success: 'Sucesso! Abrindo WhatsApp...',
      error: 'Erro ao salvar agendamento.',
    });
  }

  const formatPhone = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans">
      <HeaderGlobal cabecalho="Novo Agendamento" rota="agendamentos" />

      <main className="grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl bg-black text-white p-6 md:p-10 rounded-2xl shadow-2xl border border-zinc-800">
          
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Gerenciar Horário
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Preencha os dados para confirmar o serviço.</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* NOME */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full rounded-xl bg-zinc-100 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* TELEFONE */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">WhatsApp</label>
                <input
                  type="tel"
                  value={telefone}
                  maxLength={15}
                  onChange={(e) => setTelefone(formatPhone(e.target.value))}
                  placeholder="(13) 99999-9999"
                  className="w-full rounded-xl bg-zinc-100 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* MODELO / SERVIÇO */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Serviço</label>
                <select
                  value={valorParaEnviar}
                  onChange={(e) => setValorParaEnviar(e.target.value)}
                  className="w-full rounded-xl bg-zinc-100 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Escolha o serviço</option>
                  <option value="35">Corte Tradicional | R$ 35</option>
                  <option value="15">Barba Completa | R$ 15</option>
                  <option value="10">Sobrancelha | R$ 10</option>
                  <option value="60">Combo: Corte + Barba + sobrancelha | R$ 60</option>
                </select>
              </div>

              {/* DATA */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Data e Horário</label>
                <input
                  type="datetime-local"
                  value={dataAgendamento}
                  onChange={(e) => setDataHora(e.target.value)}
                  className="w-full rounded-xl bg-zinc-100 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all scheme-light"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-3 pt-6 border-t border-zinc-800 mt-4">
              <button
                type="button"
                onClick={() => {
                  setNome("");
                  setTelefone("");
                  setValorParaEnviar("");
                  setDataHora("");
                }}
                className="order-2 md:order-1 px-8 py-3 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
              >
                Limpar Campos
              </button>

              <button
                type="submit"
                className="order-1 md:order-2 bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-green-900/20 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
              >
                <span>Confirmar via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-8 border-t border-zinc-900">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Nexora Systems • Gestão Profissional
        </p>
      </footer>
    </div>
  );
}