import { NextResponse } from "next/server";


const API_URL = "http://localhost:8080/auth";



export async function RecoverEmail(email: string) {

    // 🔍 Buscar usuário pelo email no banco
    const response = await fetch(`${API_URL}/recover`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ email })
    });
    return response;
}

export async function AuthRecover(token: string, senha: string) {

    // 🔍 Buscar usuário pelo token no banco
    // verificar se existe e se não expirou
        const response = await fetch(`${API_URL}/reset`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ token, senha })
    });

    const user = await response.json();

    if (!user) {
        return NextResponse.json({ error: "Token inválido" }, { status: 400 });
    }
    
    return NextResponse.json({ ok: true });
}