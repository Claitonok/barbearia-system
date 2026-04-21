
export interface UsuarioApiResponse {
  data: UsuarioResponse[];
}

// Resposta da API para agendamento
export interface UsuarioResponse {
   id: number;
   nome: string;
   telefone: string;
   modelo: number;
   dataHora: string;
}
 
// Dados para criar um novo agendamento
export interface Usuario {
  nome: string;
  telefone: string;
  modelo: number;
  dataHora: string;
}