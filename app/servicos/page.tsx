import { getUsuariosAgendamento } from "@/api/auth/route";
import { HeaderGlobal } from "@/components/Header";
import { ResponseAgendamentoHorario } from "@/types/dados";
import { formatarMoeda } from "@/utils/formatarMoeda";
import Link from "next/link";

export default async function Servicos() {

  let servicos: ResponseAgendamentoHorario[] = [];
    
    // 1. Busca os dados da API
    try {
      const response = await getUsuariosAgendamento();
      servicos = response || [];
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }

  return (
    <div className="min-h-screen p-0">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <HeaderGlobal cabecalho="Gestão de Serviços" rota="agendamentos" />
         <Link 
          href="/servicos/novo"  
          className="bg-blue-600 hover:bg-blue-700 text-white md:w-50 w-50 px-6 py-2 rounded-lg font-semibold transition-all text-center"
        >
          + Novo Serviço
        </Link>
      </header>

      {/* GRID DE SERVIÇOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {servicos.map((servico) => (
          <div 
            key={servico.id} 
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg hover:border-zinc-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {servico.nome}
              </h3>
              <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full text-sm">
                {formatarMoeda(servico.valor)}
              </span>
            </div>
            {/* <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
              {servico.descricao}
            </p> */}

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <span>🕒 tempoEstimado: 30 min</span>
              </div>
            
              {/* <div className="flex gap-3">
                <Link 
                  href={`/servicos/editar/${servico.id}`}
                  className="text-zinc-400 hover:text-white text-xs font-medium underline"
                >
                  Editar
                </Link>
                <button className="text-red-500/70 hover:text-red-500 text-xs font-medium underline">
                  Excluir
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* DICA DE NEGÓCIO */}
      <div className="mt-12 bg-blue-900/20 border border-blue-800/50 p-4 rounded-lg">
        <p className="text-blue-400 text-sm italic">
          <strong>Dica:</strong> Serviços com "Combos" costumam aumentar seu Ticket Médio em até 25%. 
          Certifique-se de que os preços estão atualizados.
        </p>
      </div>
    </div>
  );
}