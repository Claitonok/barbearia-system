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
                router.push("/");
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

            <main className="flex min-h-screen items-center justify-center bg-zinc-500">
                <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-md">

                    <h1 className="text-2xl font-bold text-center mb-6">
                        Criar nova senha
                    </h1>

                    <form onSubmit={handleReset} className="flex flex-col gap-4">

                        <input
                            type="text"
                            placeholder="Token"
                            value={tokenState}
                            onChange={(e) => setTokenState(e.target.value)}
                            className="px-4 py-2 rounded-md border"
                        />

                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="px-4 py-2 rounded-md border"
                        />

                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            className="px-4 py-2 rounded-md border"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Salvando..." : "Redefinir senha"}
                        </button>
                    </form>

                </div>
            </main>
        </div>
    );
}