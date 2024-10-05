# API de Usuários e Documentos

Esta é uma API simples para gerenciar usuários e documentos usando Node.js, Express e Prisma. A API suporta operações CRUD (Criar, Ler, Atualizar, Deletar) para usuários e documentos.

## Instalação e Uso
### Back-end
#### 1. Instalar os pacotes
```
npm install

```
#### 2. Iniciar o back-end
```
npm start
```
#### 3. URL 
```
http://localhost:9000
```
### Front-end
#### 1. Instalar os pacotes
```
npm install

```
#### 2. Iniciar o front-end
```
npm start
```

#### 3. URL 
```
http://localhost:3000
```

## Rotas

### 1. Autenticação

#### **POST /auth/login**

Realiza o login do usuário e retorna um token JWT.

**Corpo da Solicitação:**

```json
{
  "email": "teste@teste.com",
  "password": "123"
}
```
**Resposta de Sucesso:**
```json
{
  "token": "jwt-token-here"
}
```

**Respostas de Erro:**

*404 Not Found* se o usuário não for encontrado.

*401 Unauthorized* se a senha estiver incorreta.

### 2. Listar todos os usuários

#### **GET /users**

Retorna uma lista de todos os usuários. **Requer autenticação JWT.**

**Exemplo de Solicitação:**

#### GET /users 

HTTP/1.1 Authorization: Bearer <token>
**Resposta de Sucesso:**

```json
[
  {
    "id": 1,
    "name": "User One",
    "email": "user1@example.com"
  },
  {
    "id": 2,
    "name": "User Two",
    "email": "user2@example.com"
  }
]
```
***Respostas de Erro:***

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.


### 3. Obter um Usuário por ID
***GET /users/:id***

Retorna os detalhes de um usuário específico com base no ID fornecido. Requer autenticação JWT.

**Exemplo de Solicitação:**
#### GET /users/1 

HTTP/1.1 Authorization: Bearer <token>

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "User One",
  "email": "user1@example.com"
}
```

***Respostas de Erro:***

*404 Not Found* se o usuário com o ID especificado não existir.

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.

### 4. Criar um Novo Usuário

#### POST /users

Cria um novo usuário.

**Exemplo de Solicitação:**
*** POST /users HTTP/1.1
Content-Type: application/json
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "userpassword"
}
``` 
**Resposta de Sucesso:**
```json
{
  "id": 3,
  "name": "New User",
  "email": "newuser@example.com"
}
```
***Respostas de Erro:***

*400 Bad Request* se o corpo da solicitação não contiver todos os campos necessários.

### 5. Atualizar um Usuário
***PUT /users/***

Atualiza as informações de um usuário existente.
**Resposta de Sucesso:**
```json
{
  "name": "Updated User"
}
```
**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "Updated User",
  "email": "user1@example.com"
}
```
***Respostas de Erro:***

*404 Not Found* se o usuário com o ID especificado não existir.

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.


### 6. Listar Todos os Documentos de um Usuário

#### **GET /users/:id/documents**

Retorna uma lista de todos os documentos. **Requer autenticação JWT.**

**Exemplo de Solicitação:**

#### ***GET /users/1/documents***
HTTP/1.1 Authorization: Bearer <token>

**Resposta de Sucesso:**

```json
[
  {
    "id": 1,
    "name": "Document One",
    "status": "active",
    "userId": 1
  },
  {
    "id": 2,
    "name": "Document Two",
    "status": "inactive",
    "userId": 2
  }
]
```
***Respostas de Erro:***

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.


### 7. Obter um Documento por ID de Documento

#### ***GET /users/:id/documents/:docId***

Retorna os detalhes de um documento específico com base no ID fornecido. Requer autenticação JWT.

**Exemplo de Solicitação:**

#### ***GET /users/1/documents/1***
HTTP/1.1 Authorization: Bearer <token>

**Resposta de Sucesso:**

```json
{
  "id": 1,
  "name": "Document One",
  "status": "active",
  "userId": 1
}
```
***Respostas de Erro:***

*404 Not Found* se o documento com o ID especificado não existir.

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.

### 8. Criar um Novo Documento

#### **POST /users/:id/documents**
**Exemplo de Solicitação:**

#### ***POST /users/1/documents***
HTTP/1.1 Authorization: Bearer <token>

```json
{
  "name": "New Document",
  "status": "active",  
}
```

**Resposta de Sucesso:**

```json
{
  "id": 3,
  "name": "New Document",
  "status": "active",
  "userId": 1
}
```
***Respostas de Erro:***
*400 Bad Request* se o corpo da solicitação não contiver todos os campos necessários.
*401 Unauthorized* se o token JWT não for fornecido ou for inválido.


### 9. Atualizar um Documento

#### **PUT /users/:id/documents/:docId**

Atualiza as informações de um documento existente.

**Exemplo de Solicitação:**

#### ***PUT /users/1/documents/1***
HTTP/1.1 Authorization: Bearer <token>

```json
{
  "name": "Updated Document",
  "status": "inactive" 
}
```

**Resposta de Sucesso:**

```json
{
  "id": 1,
  "name": "Updated Document",
  "status": "inactive",
  "userId": 1
}
```
***Respostas de Erro:***

*404 Not Found* se o documento com o ID especificado não existir.

*401 Unauthorized* se o token JWT não for fornecido ou for inválido.

