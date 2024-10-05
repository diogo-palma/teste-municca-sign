import { Request, Response } from 'express';
import { users, setUsers } from '../global'; 
import { User } from '../interfaces/user.interface';

export const getAllUsers = (req: Request, res: Response): void => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response): void => {
  const user = users.find((u: User) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;
  const newUser: User = {
    id: users.length + 1,
    name,
    password,
    email,
    documents: [],
  };
  const existingUser = users.find((u: User) => u.email === email);
  if (existingUser) {
    res.status(400).json({ error: 'User with this email already exists.' });
    return
  }
  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers); 
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
  const userIndex = users.findIndex((u: User) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
};

export const deleteUser = (req: Request, res: Response): void => {
  const updatedUsers = users.filter((u: User) => u.id !== parseInt(req.params.id));
  if (updatedUsers.length === users.length) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  setUsers(updatedUsers); 
  res.status(204).send();
};
