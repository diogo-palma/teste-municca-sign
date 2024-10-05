import { User } from "./interfaces/user.interface";
import { Document } from "./interfaces/document.interface";

export const users: User[] = [
  { id: 1, name: 'Teste', password: "123", email: 'teste@teste.com', documents: [] },
];

export const documents: Document[] = [
  { id: 1, name: 'Documento 1', status: 'ativo', userId: 1 },
  { id: 2, name: 'Documento 2', status: 'inativo', userId: 1 },  
];