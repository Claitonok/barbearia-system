import { AgendamentoHorario, ResponseAgendamentoHorario, UsuarioAdmin } from "@/types/dados";

//const API_URL = "http://localhost:8080/barbearia/json"; // My Localhost
const API_URL = "https://system-barbearia-production.up.railway.app/"; // Railway Deployment

// Recriando a credencial de forma segura
const auth = Buffer.from(`${process.env.NEXT_PUBLIC_SYSTEM_USER}:${process.env.NEXT_PUBLIC_SYSTEM_PASS}`).toString('base64');

// 1. Função para buscar usuários admin
export async function getUsuarios(): Promise<any> {

    const response = await fetch(`${API_URL}/usuarios-admin`, {
        method: "GET",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }
    return response.json();
}

// 2. Função para criar usuário admin
export async function createUsuarioAdmin(usuarioAdmin: UsuarioAdmin): Promise<UsuarioAdmin> {
    const response = await fetch(`${API_URL}/admin/create`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioAdmin)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar usuário");
    }
    return response.json();
}

// 3. Função para deletar usuário admin
export async function deleteUsuarioAdmin(id: number) {
    const response = await fetch(`${API_URL}/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
    }

    return response.json();
}

// 🔥 Função para login do usuário
export async function loginUsuarioAdmin(email: string, senha: string) {

    //  admin@admin.com
    // 0123

    const response = await fetch(`${API_URL}/admin-login`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    if (!response.ok) {
        throw new Error("Credenciais inválidas");
    }

    return response.json();
}

// 🔥 Função para enviar codigo por email de recuperação!!
export async function RecoverEmail(email: string) {

    // admin@admin.com
    // 5165766
    
    // 🔍 Buscar usuário pelo email no banco
    const response = await fetch(`${API_URL}/admin/forgot-password`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error("Email não encontrado");
    }

    return response.json();
}

// 🔥 Função para resetar senha usando o token
export async function AuthRecover(resetToken: string, senha: string) {

    // 🔍 Buscar usuário pelo token no banco
    // verificar se existe e se não expirou
    const response = await fetch(`${API_URL}/admin/reset-password`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken, senha })
    });

    if (!response.ok) {
        throw new Error("Token inválido");
    }

    return response.json();
}







// Daqui pra baixo são os métodos do agendamento, não relacionados à autenticação, mas deixei aqui para organizar melhor o código da API em um único arquivo.

// 1️⃣ GET (listar usuários)
export async function getUsuariosAgendamento(): Promise<any> {
    const response = await fetch(`${API_URL}/barbearia-agendamentos`, {
        method: "GET",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }
    return response.json();
}

// 2️⃣ POST Agendar horário
export async function agendamentoHorario(usuario: AgendamentoHorario): Promise<AgendamentoHorario> {
    const response = await fetch(`${API_URL}/barbearia-cadastro`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    console.log("STATUS:", response.status);

    if (!response.ok) {
        throw new Error("Erro ao cadastrar o agendamento!!");
    }
    return response.json();
}

// 3️⃣ PUT Atualizar os dados do Agendamento
export async function atualizarAgendamentoHorario(id: number, usuario: AgendamentoHorario): Promise<AgendamentoHorario> {
    const response = await fetch(`${API_URL}/barbearia-atualizar/${id}`, {
        method: "PUT",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error("Erro ao atualizar os dados do agendamento!");
    }
    return response.json();
}

// 4️⃣ GET Pegar os dados do Agendamento
export async function PegarOagendamentoPorId(id: number): Promise<ResponseAgendamentoHorario> {
    const response = await fetch(`${API_URL}/barbearia-usuario/${id}`, {
        method: "GET",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Erro ");
    }
    return response.json();
}

// 5️⃣ DELETE (remover usuário)
export async function deleteUsuarioAgendado(id: number) {

  const response = await fetch(`${API_URL}/barbearia-deletar/${id}`, {
    method: "DELETE",
     headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar Agendamento");
  }
}