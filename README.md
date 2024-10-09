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
```plaintext
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
```

## Instalação

1 Clone o repositório:

git clone https://api-tasks.git
cd api-tasks

2 Instale as dependências:

npm install

3 Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias:

```sh

#Porto Expresso
PORTA=3001
#Caminho do arquivo do banco de dados SQLite
DB_FILE_PATH=./src/database/nome-do-arquivo.db
#Credenciais e chaves secretas
JWT_KEY=escolheu uma chave secreta
#Tempo de expiração do token (exemplo: 1 dia)
JWT_EXPIRES_IN=1d
```

## Scripts

1 start: Inicia a aplicação em produção

```sh
npm start
```

2 dev: Inicia a aplicação em modo de desenvolvimento com nodemon

```sh
npm run dev
```

3 build: Compila o código TypeScript

```sh
npm run build
```

## Testes

Para rodar todos os testes:

```bash
npm run test
```

## Endpoints

Usuários
```typescript
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
```

Tarefas
```typescript
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
``` 
