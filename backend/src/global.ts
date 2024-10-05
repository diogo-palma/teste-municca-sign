import { User } from './interfaces/user.interface';
import { Document } from './interfaces/document.interface';

export let users: User[] = [
  { id: 1, name: 'Teste', password: "123", email: 'teste@teste.com', documents: [] },
];

export let documents: Document[] = [
  { id: 1, name: 'Documento 1', status: 'ativo', userId: 1 },
  { id: 2, name: 'Documento 2', status: 'inativo', userId: 1 },
];

export const setUsers = (newUsers: User[]) => {
  users = newUsers;
};

export const setDocuments = (newDocuments: Document[]) => {
  documents = newDocuments;
};
