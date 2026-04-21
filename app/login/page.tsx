'use client';

import { useState } from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RecoverEmail } from "@/api/auth/route";


export default function Home() {

    const [emailRecovery, setEmailRecovery] = useState("");
     // 🔄 RECUPERAÇÃO DE SENHA
    async function handleRecovery(e: any) {
        e.preventDefault();

        if (!emailRecovery) {
            toast.error("Digite seu email!");
            return;
        }

        try {
            // 🔥 chamada API
            const rest = await RecoverEmail(emailRecovery);

            if (!rest.ok) throw toast.error("Erro ao enviar email de recuperação ❌");

            toast.success("Enviamos um link de recuperação para seu email 📩");

        } catch (error) {
            toast.error("Erro ao enviar email de recuperação ❌");
        }
    }


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    // Formulario de login
    async function handleSubmit(e: any) {
        e.preventDefault();

        if (!email || !senha) {
            toast.error("Preencha todos os campos! ❌");
            return;
        }

        try {

            // const usuario = await loginUsuario(email, senha);

            //SALVAR TOKEN EM COOKIE
            // document.cookie = `token=${usuario.token}; path=/; SameSite=Lax`;

            // console.log("Token salvo:", usuario.token);
            // console.log("Usuário logado:", usuario);

            toast.success("✅ Login realizado com sucesso");

            setTimeout(() => {
                router.push("/agendamentos"); // Redirecionar para a página principal após o login
            }, 1200);

        } catch (error) {
            toast.error("Usuário ou senha inválidos ❌");
            return;
        }

        // alert("Usuário logado com sucesso");
    }

    return (

        <div className="items-center">
            <header>
                <Header title="Login" />
            </header>
            <main className="flex min-h-screen items-center justify-center bg-zinc-500 font-sans">
                <div className="mx-auto mb-80 max-w-md rounded-lg p-8 shadow-md bg-black text-white">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-center">
                        Login to your account
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-4 py-2 text-sm font-medium
                             text-white hover:bg-blue-700 focus:outline-none focus:ring-2
                              focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>

                    <hr className="mt-10" />

                    {/* Recuperar senha */}
                    <div className="p-8 shadow-md bg-black text-white">
                        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-center">
                            recover account
                        </h1>
                        <form onSubmit={handleRecovery} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={emailRecovery}
                                onChange={(e) => setEmailRecovery(e.target.value)}
                                className="px-4 py-2 border rounded-md"
                            />
                            <button className="bg-green-600 py-2 rounded-md">
                                Recuperar senha
                            </button>
                        </form>
                    </div>
                    {/* FIM de Recuperar senha */}

                </div>
            </main>

            <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} Nexora Systems. All rights reserved.
                </p>
            </footer>

        </div>
    );


}
