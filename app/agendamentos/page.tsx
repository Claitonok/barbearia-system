import { getUsuariosAgendamento } from "@/api/auth/route";
import Agendamentos from "./pagina";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function getAgendamento() {
  
    const response = await getUsuariosAgendamento();
    // const token = (await cookies()).get("token");

    // if (!token) {
    //     redirect('/login')
    // }

    return <>
        <Agendamentos usuarioUsername={response} />
    </>
}