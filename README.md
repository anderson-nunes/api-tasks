# API Tasks

## Descrição

O projeto **API Tasks** é uma API RESTful que permite gerenciar tarefas. A API permite criar, atualizar, deletar e buscar tarefas, além de possibilitar o registro e login de usuários.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
- **SQLite**: Banco de dados leve que armazena dados em um único arquivo.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários.

## Estrutura do Projeto

api-tasks/
├── src/
│ ├── business/
│ ├── controllers/
│ ├── database/
│ ├── routes/
│ ├── index.ts
│ └── ...
├── build/
├── package.json
├── tsconfig.json
└── ...

## Instalação

1 Clone o repositório:

git clone https://api-tasks.git
cd api-tasks

2 Instale as dependências:

npm install

3 Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias:

JWT_KEY=sua_chave_jwt
JWT_EXPIRES_IN=1h

## Scripts

1 start: Inicia a aplicação em produção

npm start

2 dev: Inicia a aplicação em modo de desenvolvimento com nodemon

npm run dev

## Endpoints

Usuários

GET /users: Retorna uma lista de usuários.
Query Params: nameToSearch (opcional)

POST /users/signup: Registra um novo usuário.
Body:

{
"name": "Nome do Usuário",
"email": "email@exemplo.com",
"password": "senha"
}
POST /users/login: Realiza o login de um usuário.
Body:

{
"email": "email@exemplo.com",
"password": "senha"
}

Tarefas

GET /tasks: Retorna uma lista de tarefas.
Query Params: title, creator_id, status (todos opcionais)

GET /tasks/:id: Retorna uma tarefa específica pelo ID.

POST /tasks: Cria uma nova tarefa.
Body:

{
"title": "Título da Tarefa",
"status": true,
"creator_id": "id-do-usuário"
}

PUT /tasks/:id: Atualiza uma tarefa existente pelo ID.
Body:

{
"title": "Título Atualizado",
"status": true
}

DELETE /tasks/:id: Deleta uma tarefa pelo ID.
