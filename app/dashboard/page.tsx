import { getUsuariosAgendamento } from "@/api/auth/route";
import { HeaderDashboard } from "@/components/Header";
import { ResponseAgendamentoHorario } from "@/types/dados";
import { formatarMoeda } from "@/utils/formatarMoeda";

export default async function Dashboard() {
  let agendamentos: ResponseAgendamentoHorario[] = [];
  
  // 1. Busca os dados da API
  try {
    const response = await getUsuariosAgendamento();
    agendamentos = response || [];
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }

  // 2. Lógica de Cálculos (Data de hoje: 2026-05-03)
  const hoje = new Date().toISOString().split('T')[0];

  const agendamentosHoje = agendamentos.filter(user => {
    if (!user.dataAgendamento) return false;
    return user.dataAgendamento.startsWith(hoje);
  });

  const totalAgendamentosHoje = agendamentosHoje.length;
  const faturamentoHoje = agendamentosHoje.reduce((acc, user) => acc + (user.valor || 0), 0);
  const totalClientesBase = agendamentos.length; // Quantidade total de clientes no sistema
  const ticketMedio = totalAgendamentosHoje > 0 ? faturamentoHoje / totalAgendamentosHoje : 0;

  return (
    <div className="min-h-screen p-0">
      <header>
        <HeaderDashboard title="Dashboard Geral" />
      </header>

     {/* CARDS DE RESUMO REAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        
        {/* Card 01: Agendamentos */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Agendamentos Hoje</h3>
          <p className="text-3xl font-bold mt-2 text-white">{totalAgendamentosHoje}</p>
          <p className="text-xs text-blue-400 mt-1">Sessões hoje</p>
        </div>

        {/* Card 02: Clientes Totais */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Total Clientes</h3>
          <p className="text-3xl font-bold mt-2 text-white">{totalClientesBase}</p>
          <p className="text-xs text-zinc-500 mt-1">Base cadastrada</p>
        </div>

        {/* Card 03: Faturamento */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Faturamento Hoje</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">{formatarMoeda(faturamentoHoje)}</p>
          <p className="text-xs text-green-600 mt-1 font-medium">Receita do dia</p>
        </div>

        {/* Card 04: Ticket Médio */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium">Ticket Médio</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{formatarMoeda(ticketMedio)}</p>
          <p className="text-xs text-yellow-600 mt-1 font-medium">Média por cliente</p>
        </div>

      </div>

      {/* LISTA DINÂMICA */}
      <div className="bg-zinc-900 p-6 rounded-xl mt-12 border border-zinc-800">
        <h3 className="text-lg font-semibold mb-6 text-white flex justify-between items-center">
          Próximos agendamentos do dia
          <span className="text-xs font-normal text-zinc-500">Total: {totalAgendamentosHoje}</span>
        </h3>

        <div className="flex flex-col gap-3">
          {agendamentosHoje.length > 0 ? (
            agendamentosHoje.map((user) => (
              <div key={user.id} className="flex justify-between items-center bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors">
                <div className="flex flex-col">
                  <span className="text-zinc-100 font-medium">{user.nome}</span>
                  <span className="text-zinc-500 text-xs">{user.telefone}</span>
                </div>
                <div className="text-right">
                  <span className="text-yellow-400 font-mono font-bold block">
                    {user.dataAgendamento.split(' ')[1].substring(0, 5)}
                  </span>
                  <span className="text-green-500 text-xs">{formatarMoeda(user.valor)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-500 text-sm italic py-4">Nenhum agendamento para hoje.</p>
          )}
        </div>
      </div>
    </div>
  );
}