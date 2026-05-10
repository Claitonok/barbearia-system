'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { AuthRecover } from "@/api/auth/route";

export default function ResetPasswordPage() {

    const router = useRouter();

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tokenState, setTokenState] = useState("");
    const [loading, setLoading] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    async function handleReset(e: any) {
        e.preventDefault();

        if (!tokenState) {
            toast.error("Token inválido ou inexistente");
            return;
        }

        if (!senha || !confirmarSenha) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (senha.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres");
            return;
        }

        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem");
            return;
        }

        setLoading(true);

        try {
            const res = await AuthRecover(tokenState, senha);

            if (!res.ok) throw toast.error("Token inválido ou expirado");

            toast.success("Senha redefinida com sucesso 🎉");

            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (error) {
            toast.error("Token inválido ou expirado");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Header title="Redefinir senha" />

            <main className="grow flex items-center justify-center p-4 md:p-8 bg-zinc-500">
                <div className="w-full max-w-md bg-black text-white p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-800">

                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                        Criar nova senha
                    </h1>

                    <form onSubmit={handleReset} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-zinc-400 ml-1">Token de 6 dígitos</label>
                            <input
                                type="text" // Alterado para text para melhor controle de maxLength
                                placeholder="000000"
                                maxLength={6}
                                value={tokenState}
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    if (/^\d*$/.test(valor) && valor.length <= 6) {
                                        setTokenState(valor);
                                    }
                                }}
                                inputMode="numeric"
                                className="px-4 py-3 rounded-xl border-none bg-zinc-100 text-black font-mono text-center text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Nova senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="px-4 py-3 rounded-xl border-none bg-zinc-100 text-black focus:ring-2 focus:ring-blue-500 transition-all"
                            />

                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Confirmar senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                className="px-4 py-3 rounded-xl border-none bg-zinc-100 text-black focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Checkbox Estilizado */}
                        <label className="flex items-center gap-3 cursor-pointer w-fit group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={mostrarSenha}
                                    onChange={() => setMostrarSenha(!mostrarSenha)}
                                    className="peer appearance-none h-5 w-5 border border-zinc-700 rounded bg-zinc-900 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                />
                                <svg className="absolute h-5 w-5 text-white p-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Mostrar senhas</span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mt-2"
                        >
                            {loading ? "Processando..." : "Redefinir senha"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}