-- Active: 1728324666831@@127.0.0.1@3306
-- SQLBook: Code
-- Active: 1728238003644@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);

SELECT * FROM users;
DROP TABLE users;

INSERT INTO users (id, name, email, password)
VALUES
	('u004', 'Fulano', 'fulano04@email.com', '$2a$12$kUtElOebs1Zl6CBAUc6Ndeit6M/heGgohjgYS.g6c72sbT/y.TVYK'),
    ('u005', 'Beltrana', 'beltrana05@email.com', '$2a$12$gO/aPYDibF3LW/X4cK2vlOHGJi/oAMFvCgU8sRe5W23vZM4oWC.Qy'),
	('u006', 'Astrodev', 'astrodev06@email.com', '$2a$12$N86uqg4FewXtEUKNaS.yduFpkL/KS8r1iCq2/heVGOhasXaLWG7ga');

  
CREATE TABLE tasks (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status BOOLEAN NOT NULL,
  creator_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO tasks (id, title, status, creator_id)
VALUES
    ('t004', 'Task 4', 0, 'u004'),
    ('t005', 'Task 5', 1, 'u005'),
    ('t006', 'Task 6', 0, 'u006');

-- Selecionando todas as tarefas
SELECT * FROM tasks;

DROP TABLE tasks;
