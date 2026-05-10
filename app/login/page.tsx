'use client';

import { useState } from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUsuarioAdmin, RecoverEmail } from "@/api/auth/route";

export default function Home() {
    const [emailRecovery, setEmailRecovery] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const router = useRouter();

    // 🔄 RECUPERAÇÃO DE SENHA
    async function handleRecovery(e: any) {
        e.preventDefault();
        if (!emailRecovery) {
            toast.error("Digite seu email!");
            return;
        }

        try {
            const rest = await RecoverEmail(emailRecovery);
            if (!rest.ok) throw new Error();

            toast.success("Enviamos um token de recuperação para seu email 📩");
            setTimeout(() => {
                router.push("/reset-password");
            }, 2000);
        } catch (error) {
            toast.error("Email não encontrado ou erro no servidor ❌");
        }
    }

    // 🔑 FORMULÁRIO DE LOGIN
    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!email || !senha) {
            toast.error("Preencha todos os campos! ❌");
            return;
        }

        try {
            const usuario = await loginUsuarioAdmin(email, senha);
            document.cookie = `token=${usuario.token}; path=/; SameSite=Lax`;
            toast.success("✅ Login realizado com sucesso");
            setTimeout(() => {
                router.push("/agendamentos");
            }, 1200);
        } catch (error) {
            toast.error("Usuário ou senha inválidos ❌");
        }
    }

    return (
        <div className="min-h-screen bg-zinc-500 flex flex-col font-sans">
            <header>
                <Header title="Login" />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-4 gap-8">
                
                {/* CARD DE LOGIN */}
                <div className="w-full max-w-md bg-black text-white p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-800">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 tracking-tight">
                        Acessar Conta
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-zinc-100 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        
                        <div className="flex flex-col gap-2">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="px-4 py-3 rounded-xl bg-zinc-100 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            
                            <label className="flex items-center gap-2 cursor-pointer w-fit group">
                                <input
                                    type="checkbox"
                                    checked={mostrarSenha}
                                    onChange={() => setMostrarSenha(!mostrarSenha)}
                                    className="accent-blue-600 h-4 w-4 rounded"
                                />
                                <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                    Mostrar senha
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] mt-2"
                        >
                            Entrar no Sistema
                        </button>
                    </form>
                </div>

                {/* CARD DE RECUPERAÇÃO (Mais sutil) */}
                <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-sm text-white p-6 md:p-8 rounded-2xl border border-zinc-800/50 shadow-xl">
                    <h2 className="text-xl font-semibold text-center mb-4 text-zinc-300">
                        Esqueceu a senha?
                    </h2>
                    
                    <form onSubmit={handleRecovery} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="email@cadastrado.com"
                            value={emailRecovery}
                            onChange={(e) => setEmailRecovery(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                        <button className="bg-green-700 hover:bg-green-800 py-3 rounded-xl font-semibold text-white transition-all active:scale-[0.98]">
                            Enviar Link de Recuperação
                        </button>
                    </form>
                </div>

            </main>

            <footer className="border-t border-zinc-400/20 py-6">
                <p className="text-center text-xs text-zinc-300">
                    © {new Date().getFullYear()} Nexora Systems. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    );
}