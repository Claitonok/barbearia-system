import Link from "next/link";
import { Button } from "./Button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="w-full border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-xl font-bold">Barbearia</h1>
        <h1 className="text-lg font-semibold">{title}</h1>


      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">
          Olá, Admin
        </span>
        <div className="w-8 h-8 bg-yellow-400 rounded-full" />
          <Button>Novo Agendamento</Button>
      </div>

    </header>
  );
}

export function HeaderAgendamentos() {
  return (
    <header className="w-full border-b border-zinc-800 px-6 py-4 md:flex justify-between items-center">
        <h1 className="text-xl font-bold">Barbearia</h1>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">
          Olá, Admin
        </span>
        <div className="w-8 h-8 bg-yellow-400 rounded-full" />

       <Link href="/agendamentos" className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">
          Lista Agendamento
       </Link>

      </div>

    </header>
  );
}


export function HeaderHome() {
  return (
    <header className="w-full border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-xl font-bold">Barbearia</h1>
        <h1 className="text-lg font-semibold">Home</h1>


      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">
          Olá, Visitante
        </span>
        <div className="w-8 h-8 bg-yellow-400 rounded-full" />
      </div>

    </header>
  );
}
