import { HeaderAgendamentos } from "@/components/Header";

export default function Dashboard() {
  return (
   
    <div className="min-h-screen">
      
      <header>
        <HeaderAgendamentos />
      </header>

      {/* CARDS */}
      <div className="flex flex-col gap-6 md:flex-row mt-12">

        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-zinc-400 text-sm">Agendamentos hoje</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-zinc-400 text-sm">Clientes</h3>
          <p className="text-2xl font-bold mt-2">84</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-zinc-400 text-sm">Faturamento</h3>
          <p className="text-2xl font-bold mt-2">R$ 1.250</p>
        </div>

      </div>

      {/* LISTA */}
      <div className="bg-zinc-900 p-6 rounded-xl mt-12">

        <h3 className="text-lg font-semibold mb-4">
          Próximos agendamentos
        </h3>

        <div className="flex flex-col gap-3">

          <div className="flex justify-between bg-zinc-800 p-3 rounded-lg">
            <span>João - Corte</span>
            <span className="text-yellow-400">14:00</span>
          </div>

          <div className="flex justify-between bg-zinc-800 p-3 rounded-lg">
            <span>Maria - Barba</span>
            <span className="text-yellow-400">15:00</span>
          </div>

        </div>

      </div>

    </div>
  );
}