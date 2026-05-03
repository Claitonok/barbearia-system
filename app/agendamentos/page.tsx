import { getUsuariosAgendamento } from "@/api/auth/route";
import Agendamentos from "./pagina";


export default async function getAgendamento() {
  
    const response = await getUsuariosAgendamento();

    return <>
        <Agendamentos usuarioUsername={response} />
    </>
}