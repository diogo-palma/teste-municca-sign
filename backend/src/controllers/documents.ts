import { Request, Response } from 'express';
import { users, documents, setUsers, setDocuments } from '../global'; 
import { Document } from '../interfaces/document.interface';
import { User } from '../interfaces/user.interface';

export const getDocumentsByUser = (req: Request, res: Response): void => {
  const user = users.find((u: User) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  const userDocuments: Document[] = documents.filter((doc) => doc.userId === user.id);
  
  if (userDocuments.length === 0) {
    res.status(404).json({ message: 'No documents found for this user.' });
    return;
  }

  res.json(userDocuments);
};

export const createDocumentForUser = (req: Request, res: Response): void => {
  const { name, status } = req.body;
  const user = users.find((u: User) => u.id === parseInt(req.params.id));

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const newDocument: Document = {
    id: documents.length + 1,
    name,
    status,
    userId: user.id,
  };

  user.documents.push(newDocument); 
  const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
  setUsers(updatedUsers); 

  const updatedDocuments = [...documents, newDocument];
  setDocuments(updatedDocuments); 

  res.status(201).json(newDocument);
};

export const updateDocument = (req: Request, res: Response): void => {
  const document = documents.find((d: Document) => d.id === parseInt(req.params.docId));

  if (!document) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  const { name, status } = req.body;
  document.name = name || document.name;
  document.status = status || document.status;

  const updatedDocuments = documents.map((d) => (d.id === document.id ? document : d));
  setDocuments(updatedDocuments); 

  res.json(document);
};

export const deleteDocument = (req: Request, res: Response): void => {
  const docIndex = documents.findIndex((d: Document) => d.id === parseInt(req.params.docId));

  if (docIndex === -1) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  const updatedDocuments = documents.filter((d) => d.id !== parseInt(req.params.docId));
  setDocuments(updatedDocuments); 

  res.status(204).send();
};
