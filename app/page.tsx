'use client';

import { agendamentoHorario } from "@/api/auth/route";
import { HeaderHome } from "@/components/Header";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataAgendamento, setDataHora] = useState("");
  const [valorParaEnviar, setvalorParaEnviar] = useState("");

  const valor = Number(valorParaEnviar);

  const horariosFuncionamento = [
    { dias: "Terça a Sexta", horas: "09:00 - 19:00" },
    { dias: "Sábado", horas: "08:00 - 18:00" },
    { dias: "Dom e Seg", horas: "Fechado", destaque: true },
  ];

  function validarHorario(dataIso: string) {
    const data = new Date(dataIso);
    const diaSemana = data.getDay(); 
    const hora = data.getHours();

    if (diaSemana === 0 || diaSemana === 1) return { valida: false, msg: "Estamos fechados aos Domingos e Segundas! 😴" };
    
    if (diaSemana === 6) {
      if (hora < 8 || hora >= 18) return { valida: false, msg: "No sábado atendemos das 08:00 às 18:00! ✂️" };
    } else {
      if (hora < 9 || hora >= 19) return { valida: false, msg: "Nosso horário é das 09:00 às 19:00! ✂️" };
    }
    return { valida: true };
  }

  const handleLimpar = () => {
    setNome("");
    setTelefone("");
    setDataHora("");
    setvalorParaEnviar("");
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!nome || !telefone || !dataAgendamento || !valor) {
      toast.error("Por favor, preencha todos os campos! ❌");
      return;
    }

    const validacao = validarHorario(dataAgendamento);
    if (!validacao.valida) {
      toast.error(validacao.msg);
      return;
    }

    const agendar = async () => {
      // await agendamentoHorario({ nome, telefone, valor, dataAgendamento });
      window.open(gerarLinkWhatsApp(), "_blank");
      return "Agendamento realizado!";
    };

    toast.promise(agendar, {
      loading: 'Processando seu horário...',
      success: 'Sucesso! Redirecionando...',
      error: 'Erro ao agendar.',
    });
  }

  function gerarLinkWhatsApp() {
    const numeroBarbearia = "+5513997290816";

    const mensagem =`
*Barbearia*\n
Olá, *${nome}* \n
Seu agendamento foi solicitado:\n
 *Data:* ${new Date(dataAgendamento).toLocaleString('pt-BR')}\n
 *Contato:* ${telefone}\n
 *Serviço:* R$ ${valor},00
    `;

    return `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;    
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
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-white">
      
      <HeaderHome />

      <main className="grow flex flex-col items-center p-4 md:p-8 space-y-8">
        
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-linear-to-r 
            from-white to-zinc-500 bg-clip-text text-transparent uppercase leading-tight">
              Estilo & <br /> Navalha
            </h1>
            <p className="text-zinc-400 mt-4 max-w-sm">
              Sua melhor versão começa aqui. Agende seu atendimento exclusivo com nossa equipe.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">Funcionamento</h3>
            <div className="space-y-3">
              {horariosFuncionamento.map((h, i) => (
                <div key={i} className="flex justify-between items-center border-b border-zinc-800/50 pb-2 last:border-0">
                  <span className="text-sm font-medium text-zinc-300">{h.dias}</span>
                  <span className={`text-sm font-bold ${h.destaque ? 'text-red-500/80' : 'text-white'}`}>
                    {h.horas}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-black border border-zinc-800 p-6 md:p-10 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-blue-600 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold">Solicitar Horário</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Seu Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} 
                placeholder="Nome completo" className="w-full rounded-2xl bg-zinc-100 
                text-black px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">WhatsApp</label>
                <input type="tel" value={telefone} maxLength={15} onChange={(e) => setTelefone(formatPhone(e.target.value))}
                 placeholder="(13) 99999-9999" className="w-full rounded-2xl bg-zinc-100 text-black px-5 
                 py-4 outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Serviço</label>
                <select value={valor} onChange={(e) => setvalorParaEnviar(e.target.value)} 
                className="w-full rounded-2xl bg-zinc-100 text-black px-5 py-4 outline-none focus:ring-2 
                focus:ring-blue-500 font-semibold appearance-none cursor-pointer">
                  <option value="">Escolha o serviço</option>
                  <option value="35">Corte Tradicional | R$ 35</option>
                  <option value="15">Barba Completa | R$ 15</option>
                  <option value="10">Sobrancelha | R$ 10</option>
                  <option value="60">Combo: Corte + Barba + sobrancelha | R$ 60</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Data e Hora</label>
                <input type="datetime-local" value={dataAgendamento}
                 onChange={(e) => setDataHora(e.target.value)} 
                 className="w-full rounded-2xl bg-zinc-100 text-black px-5 py-4 outline-none
                  focus:ring-2 focus:ring-blue-500 font-semibold scheme-light" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
              <button 
                type="button" 
                onClick={handleLimpar}
                className="w-full md:w-1/3 py-4 text-zinc-500 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors"
              >
                Limpar Campos
              </button>

              <button 
                type="submit" 
                className="w-full md:w-2/3 bg-green-600 hover:bg-green-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.15em] shadow-xl shadow-green-950/20 transition-all active:scale-95"
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-zinc-900/50">
        <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Nexora Systems • Barber Manager
        </p>
      </footer>
    </div>
  );
}