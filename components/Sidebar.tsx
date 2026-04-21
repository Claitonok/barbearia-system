
export function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-zinc-800 p-6 flex flex-col gap-6">

      <h1 className="text-2xl font-bold text-yellow-400">
        Barbearia
      </h1>

      <nav className="flex flex-col gap-3 text-sm">

        <a className="hover:bg-zinc-800 p-2 rounded-lg transition">
          Dashboard
        </a>

        <a className="hover:bg-zinc-800 p-2 rounded-lg transition">
          Agendamentos
        </a>

        <a className="hover:bg-zinc-800 p-2 rounded-lg transition">
          Clientes
        </a>

        <a className="hover:bg-zinc-800 p-2 rounded-lg transition">
          Serviços
        </a>

        <a className="hover:bg-zinc-800 p-2 rounded-lg transition">
          Configurações
        </a>

      </nav>

    </aside>
  );
}