import React, { useEffect, useState, useCallback } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { fetchDocuments, fetchUsers } from './api/api';


const App = () => {
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [showRegister, setShowRegister] = useState(false);

  
  const loadUsers = useCallback(async () => {
    if (isLoggedIn) {
      const data = await fetchUsers(token);
      setUsers(data);
    }
  }, [isLoggedIn, token]);

  
  const loadDocuments = async (userId) => {
    const data = await fetchDocuments(userId, token);
    setDocuments(data);
  };

  
  useEffect(() => {
    if (isLoggedIn) {
      loadUsers();
    }
  }, [isLoggedIn, loadUsers]);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleRegister = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDocuments([]);
  };

  const handleFetchDocumentsForUser = (userId) => {
    loadDocuments(userId);
  };

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Usuários</h1>
          <ul className="mb-4">
            {users.map(user => (
              <li key={user.id} className="flex justify-between items-center mb-2">
                <span>{user.name} - {user.email}</span>
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleFetchDocumentsForUser(user.id)}
                >
                  Ver Documentos
                </button>
              </li>
            ))}
          </ul>

          {documents.length > 0 && ( 
            <>
              <h1 className="text-2xl font-bold mb-4">Documentos</h1>
              <ul>
              {documents.map(document => (
                <li key={document.id} className="mb-2">{document.name} - {document.status}</li>
              ))}
            </ul>
            </>
          )}
          

          <button 
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      ) : showRegister ? (
        <Register onRegister={handleRegister} />
      ) : (
        <div>
          <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
          <p>
            Não tem uma conta?{' '}
            <button 
              className="text-blue-500"
              onClick={() => setShowRegister(true)}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
