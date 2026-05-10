
export interface UsuarioApiResponse {
  data: ResponseAgendamentoHorario[];
}

// Resposta da API para agendamento
export interface ResponseAgendamentoHorario {
   id: Number;
   nome: string;
   telefone: string;
   valor: Number;
   dataAgendamento: string;
}
 
// Dados para criar um novo agendamento
export interface AgendamentoHorario {
  nome: string;
  telefone: string;
  valor: Number;
  dataAgendamento: string;
}




//-------------------------------//
        // Aqui para baixo pertence ao endPoint do Admin

export interface UsuarioAdmin {
  nome: string;
  email: String;
  senha: String
}