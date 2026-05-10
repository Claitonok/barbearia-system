'use client';

import Link from "next/link";
import { Button } from "./Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    // <header className="w-full border-b border-zinc-800 px-6 py-4 flex justify-between items-center">

    //   <h1 className="text-xl font-bold">Barbearia</h1>
    //   <h1 className="text-lg font-semibold">{title}</h1>


    //   <div className="flex items-center gap-4">
    //     <span className="text-sm text-zinc-400">
    //       Olá, Admin
    //     </span>
    //     <div className="w-8 h-8 bg-yellow-400 rounded-full" />
    //     <Button textoBotao="Novo Agendamento"></Button>
    //   </div>

    // </header>
   
      <nav className="bg-black border-b border-zinc-800 w-full p-4 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Lado Esquerdo: Título */}
        <h1 className="text-xl font-bold text-white">{title}</h1>

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links de Acesso (Desktop) */}
        <div className="hidden md:flex gap-6 items-center text-zinc-400">
          <Button textoBotao="Novo Agendamento"></Button>
        </div>
      </div>

      {/* Menu Mobile Dropdown (Aparece ao clicar) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 z-50 flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded"
          >
            Novo Agendamento
          </Link>

        </div>
      )}
    </nav>


  );
}

// Pagina de Serviços
interface HeadeServico {
  cabecalho: String;
  rota: String;
}
export function HeaderGlobal({ cabecalho, rota }: HeadeServico) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black border-b border-zinc-800 w-full p-4 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Lado Esquerdo: Título */}
        <h1 className="text-xl font-bold text-white">{cabecalho}</h1>

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links de Acesso (Desktop) */}
        <div className="hidden md:flex gap-6 items-center text-zinc-400">

          <Link href={`/${rota}`} className="bg-blue-500 hover:bg-blue-600
           text-white font-bold py-2 px-8 rounded">Lista Agendamento</Link>

          <Link href="/logout" className="rounded bg-red-600 px-8 py-2 font-bold 
             text-white hover:bg-red-700 hover:scale-105">logout</Link>

        </div>
      </div>

      {/* Menu Mobile Dropdown (Aparece ao clicar) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 z-50 flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <Link
            href={`/${rota}`}
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded"
          >
            Lista Agendamento
          </Link>

          <Link href="/logout"
            onClick={() => setIsOpen(false)}
            className="rounded bg-red-600 px-8 py-2 font-bold 
          text-white hover:bg-red-700 hover:scale-105">
            Logout
          </Link>

        </div>
      )}
    </nav>
  );

}


// Dashboard
export function HeaderDashboard({ title }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black border-b border-zinc-800 w-full p-4 relative">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Lado Esquerdo: Título */}
        <h1 className="md:text-xl text-2xl px-4 font-bold">Barbearia</h1>
        <h1 className="md:text-xl text-1l font-bold">{title}</h1>

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links de Acesso (Desktop) */}
        <div className="hidden md:flex gap-6 items-center text-zinc-400">

          <span className="text-sm text-zinc-400">
            Olá, Admin
          </span>
          <div className="w-8 h-8 bg-yellow-400 rounded-full" />

          <Link href="/agendamentos" className=" bg-blue-500 hover:bg-blue-600
            text-white font-bold py-2 px-8 rounded">
            Lista Agendamento
          </Link>

          <Link href="/logout" className="rounded bg-red-600 px-8 py-2 font-bold 
             text-white hover:bg-red-700 hover:scale-105">logout</Link>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 z-50 flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <Link
            href="/agendamentos"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded"
          >
            Lista Agendamento
          </Link>

          <Link href="/logout"
            onClick={() => setIsOpen(false)}
            className="rounded bg-red-600 px-8 py-2 font-bold 
          text-white hover:bg-red-700 hover:scale-105">
            Logout
          </Link>

        </div>
      )}

    </nav>
  );
}


// Page Agendamentos
export function HeaderAgendamentos({ title }: HeaderProps) {
const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black border-b border-zinc-800 w-full p-4 relative">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Lado Esquerdo: Título */}
        <h1 className="md:text-xl text-2xl px-4 font-bold">Barbearia</h1>
        <h1 className="md:text-xl text-1l font-bold">{title}</h1>

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links de Acesso (Desktop) */}
        <div className="hidden md:flex gap-6 items-center text-zinc-400">

          <span className="text-sm text-zinc-400">
            Olá, Admin
          </span>
          <div className="w-8 h-8 bg-yellow-400 rounded-full" />

          <Link href="/servicos" className=" bg-blue-500 hover:bg-blue-600
            text-white font-bold py-2 px-8 rounded">
            Lista Serviços
          </Link>

          <Link href="/logout" className="rounded bg-red-600 px-8 py-2 font-bold 
             text-white hover:bg-red-700 hover:scale-105">logout</Link>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 z-50 flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <Link
            href="/servicos"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded"
          >
             Lista Serviços
          </Link>

          <Link href="/logout"
            onClick={() => setIsOpen(false)}
            className="rounded bg-red-600 px-8 py-2 font-bold 
          text-white hover:bg-red-700 hover:scale-105">
            Logout
          </Link>

        </div>
      )}

    </nav>
  );
}

// Pagina Home
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












// // Pagina de Serviços
// interface HeadeServico{
//   cabecalho: String;
//   rota: String;
// }
// export function HeaderGlobal({cabecalho, rota}: HeadeServico){

//   return (
//     <header className="w-full border-b border-zinc-800 px-6 py-4 md:flex justify-between items-center">
//         <h1 className="text-xl font-bold">Barbearia</h1>
//         <h1 className="text-lg font-semibold">{cabecalho}</h1>
//       <div className="flex items-center gap-4">
//         <span className="text-sm text-zinc-400">
//           Olá, Admin
//         </span>
//         <div className="w-8 h-8 bg-yellow-400 rounded-full" />

//         <Link href={`/${rota}`} className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">
//           Lista Agendamento
//        </Link>
//        <Link href="/logout" className="rounded bg-red-600 px-8 py-2 font-bold
//             text-white hover:bg-red-700 hover:scale-105">
//           Logout
//         </Link>

//       </div>

//     </header>
//   );

// }