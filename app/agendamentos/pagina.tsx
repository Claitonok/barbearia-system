'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ResponseAgendamentoHorario } from "@/types/dados";
import { HeaderAgendamentos } from "@/components/Header";
import ComponenteFormatarValor from "./componenteFormatarValor";
import { deleteUsuarioAgendado } from "@/api/auth/route";

interface Usuario {
  usuarioUsername: ResponseAgendamentoHorario[];
}

export default function Agendamentos(props: Usuario) {
  
  const usuarios = props.usuarioUsername || [];

  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroHoje, setFiltroHoje] = useState(true);
  const [ordenar, setOrdenar] = useState<keyof ResponseAgendamentoHorario>("id");
  const [direcao, setDirecao] = useState<"asc" | "desc">("asc");

  const itensPorPagina = 5;

  // 1. Defina o dia de hoje (YYYY-MM-DD)
const hoje = new Date().toISOString().split('T')[0];

// 2. Filtra os usuários para mostrar apenas os de HOJE
// const usuariosDoDia = useMemo(() => {
//   return usuarios.filter((user) => {
//     if (!user.dataAgendamento) return false;
    
//     // Converte a data do agendamento para o mesmo formato YYYY-MM-DD
//     const dataAgendamento = new Date(user.dataAgendamento).toISOString().split('T')[0];
    
//     return dataAgendamento === hoje;
//   });
// }, [usuarios, hoje]);

// 3. Ajusta o filtro de BUSCA para olhar apenas para os dados já filtrados do dia
const usuariosFiltrados = useMemo(() => {
  // Começamos com TODOS os usuários que vieram da API
  let lista = usuarios;

  // Passo A: Se o botão "Hoje" estiver ativo, reduzimos a lista
  if (filtroHoje) {
    lista = lista.filter((user) => {
      if (!user.dataAgendamento) return false;
      const dataFormatada = new Date(user.dataAgendamento).toISOString().split('T')[0];
      return dataFormatada === hoje;
    });
  }

  // Passo B: Sobre o resultado anterior, aplicamos a busca por texto
  if (busca) {
    lista = lista.filter((user) =>
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.telefone.toLowerCase().includes(busca.toLowerCase())
    );
  }

  return lista;
}, [usuarios, filtroHoje, busca, hoje]);

  // ORDENAÇÃO
  const usuariosOrdenados = useMemo(() => {
    return [...usuariosFiltrados].sort((a, b) => {

      const valorA = a[ordenar];
      const valorB = b[ordenar];

      if (valorA < valorB) return direcao === "asc" ? -1 : 1;
      if (valorA > valorB) return direcao === "asc" ? 1 : -1;

      return 0;
    });
  }, [usuariosFiltrados, ordenar, direcao]);

  // PAGINAÇÃO
  const totalPaginas = Math.ceil(usuariosOrdenados.length / itensPorPagina);

  const usuariosPagina = usuariosOrdenados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );


  function ordenarColuna(coluna: keyof ResponseAgendamentoHorario) {

    if (ordenar === coluna) {
      setDirecao(direcao === "asc" ? "desc" : "asc");
    } else {
      setOrdenar(coluna);
      setDirecao("asc");
    }

  }

  //Metodo de deletar o usuario!
   async function handleDelete(id: number) {
    try {
      await deleteUsuarioAgendado(id);
      if (!id) {
        toast.error("Usuário não encontrado ❌");
        return;
      }
      toast.success("Usuário deletado com sucesso ✅");
    } catch {
      toast.error("Erro ao deletar usuário ❌");
    }
  }

  return (

    <div className="w-full">
        <header>
            <HeaderAgendamentos title={`Agendamentos de Hoje - ${new Date().toLocaleDateString('pt-BR')}`} />
        </header>

      {/* BUSCA */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 mt-20">

        <input
          type="text"
          placeholder="Buscar usuário..."
          value={busca}
          onChange={(e) => {
              setBusca(e.target.value)
              setPaginaAtual(1)
            }}
            className="w-full md:w-72 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            />
            {/* BOTÃO PARA ATIVAR/DESATIVAR FILTRO DE HOJE */}
          <button
            onClick={() => {
              setFiltroHoje(!filtroHoje);
              setPaginaAtual(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              filtroHoje 
                ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700" 
                : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200"
            }`}
          >
            {filtroHoje ? "📋 Mostrar: Todos " : "📅 Mostrar: Hoje"}
          </button>

        <span className="text-sm text-zinc-500">
          {usuariosFiltrados.length} usuários
        </span>

      </div>

      {/* TABELA */}

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">

        <table className="w-full text-sm text-left">

          <thead className="bg-zinc-100 dark:bg-zinc-800">

            <tr className="text-zinc-700 dark:text-zinc-200">

              {/* <th
                onClick={() => ordenarColuna("id")}
                className="cursor-pointer px-4 py-3 hover:text-blue-500"
                >
                ID ↕
              </th> */}

              <th
                onClick={() => ordenarColuna("nome")}
                className="cursor-pointer px-4 py-3 hover:text-blue-500"
                >
                Nome ↕
              </th>

              <th
                onClick={() => ordenarColuna("telefone")}
                className="cursor-pointer px-4 py-3 hover:text-blue-500"
                >
                Telefone ↕
              </th>

              <th className="px-4 py-3">Data e Hora</th>
              <th className="px-4 py-3">Serviço</th>

              <th className="px-4 py-3 text-center">
                Ações
              </th>

            </tr>

          </thead>

          <tbody className="bg-white dark:bg-zinc-900">

            {usuariosPagina.map((user) => (
                
                <tr
                key={user.id}
                className="border-t border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >

                {/* <td className="px-4 py-3">{user.id}</td> */}

                <td className="px-4 py-3 font-medium">
                  {user.nome}
                  {/* <input type="text" name="txtNome" placeholder={user.nome} id="" /> */}
                </td>

                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                  {user.telefone}
                  {/* <input type="email" name="txtTelefone" placeholder={user.telefone} id="" /> */}
                </td>

                <td className="px-4 py-3"> 
                  {user.dataAgendamento ? new Date(user.dataAgendamento).toLocaleString('pt-BR') : "Data não informada"}
                  {/* <input type="text" name="txtDataHora" placeholder={user.dataAgendamento ? new Date(user.dataAgendamento).toLocaleString('pt-BR') : "Data não informada"} id="" /> */}
                </td>

                 <td className="px-4 py-3">
                   <ComponenteFormatarValor valor={user.valor}/>
                  {/* <input type="text" name="txtModelo" value={user.valor} id="" /> */}
                </td>

                <td className="px-4 py-3">

                  <div className="flex justify-center gap-2">

                    {/* <Link
                      href={`/editar/${user.id}`}
                      className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                      >
                      Editar
                    </Link> */}

                    <button onClick={() => handleDelete(user.id)}
                      className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                      >
                      Excluir Agendamento
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINAÇÃO */}

      <div className="flex justify-center mt-6 gap-2">

        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          className="px-3 py-1 text-sm rounded-md border disabled:opacity-40"
          >
          Anterior
        </button>

        <span className="px-3 py-1 text-sm">
          {paginaAtual} / {totalPaginas}
        </span>

        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          className="px-3 py-1 text-sm rounded-md border disabled:opacity-40"
        >
          Próxima
        </button>

      </div>

      <div className="flex justify-center mt-10">
            <Link href="/dashboard" className="rounded-lg px-15 py-3.5 text-center font-semibold bg-blue-700 text-white hover:bg-blue-800 hover:text-white">
              Voltar para Dashboard
            </Link>
      </div>

    </div>

  );
}