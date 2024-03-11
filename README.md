# Parrot API

Parrot API é o backend do saas Parrot. Um software que une inteligência artifical e áudios, fornecendo serviços como transcrição deles, resumos e perguntas e respostas.

# Features

* Usuários podem se cadastrar e fazer login em suas contas cadastradas
* Usuários autenticados podem acessar todos o serviços fornecidos

		1. Transcrição de áudio,

		2. Gerar resumo da transcrição,

		3. Fazer perguntas sobre a transcrição

# Endpoints

* **IDENTITY**

| Método HTTP | Endpoint              | Descrição                                      |
|-------------|-----------------------|------------------------------------------------|
| POST        | /create               | Criar uma nova conta de usuário                |
| POST        | /login-with-google    | Criar uma nova conta de usuário com o Google   |
| GET         | /user-by-email/:email | Obter usuário por email                        |
| GET         | /user-by-id/:id       | Obter usuário por ID                           |
| PUT         | /update-tier/:id      | Atualizar nível de usuário                     |
| PUT         | /update-credits/:id   | Atualizar créditos do usuário                  |
| DELETE      | /delete/:id           | Excluir conta de usuário                       |

* **QUESTION**

| Método HTTP | Endpoint              | Descrição                               |
|-------------|-----------------------|-----------------------------------------|
| POST        | /create               | Criar uma nova pergunta                 |
| GET         | /by-id/:id            | Obter pergunta por ID                   |
| GET         | /by-trans-id/:id      | Obter perguntas por ID da transcrição   |
| PUT         | /update-answer/:id    | Atualizar resposta                      |
| DELETE      | /delete/:id           | Excluir pergunta                        |

* **SUMMARY**

| Método HTTP | Endpoint         | Descrição                               |
|-------------|------------------|-----------------------------------------|
| POST        | /create          | Criar um novo resumo                    |
| GET         | /by-id/:id       | Obter resumo por ID                     |
| DELETE      | /delete/:id      | Excluir resumo                          |

* **TRASCRIPTION**

| Método HTTP | Endpoint                  | Descrição                               |
|-------------|---------------------------|-----------------------------------------|
| POST        | /upload-audio/:id         | Criar uma nova transcrição              |
| GET         | /by-id/:id                | Obter transcrição por ID                |
| GET         | /by-user/:id              | Obter transcrição por ID do usuário     |
| DELETE      | /delete/:id               | Excluir transcrição                     |


## Contribuindo

Contribuições para o ParrotBack são muito bem-vindas! Se você gostaria de contribuir, siga estas instruções:

1. Faça um fork do repositório.
2. Crie sua branch de funcionalidade (`git checkout -b feature/SuaFeature`).
3. Adicione suas alterações (`git add .`).
3. Faça commits das suas alterações (`git commit -m 'Adicionando uma funcionalidade'`).
4. Faça push para a branch (`git push origin feature/SuaFeature`).
5. Crie um novo Pull Request.

# Dependencies

	@nestjs/common: 10.2.8,
	@nestjs/config: 3.1.1,
	@nestjs/core: 10.2.8,
	@nestjs/cli: 10.2.1,
	@nestjs/platform-express: 10.2.8,
	@nestjs/schedule: 4.0.1,
	@nestjs/swagger: 7.3.0,
	@prisma/client: 5.6.0,
	axios: 1.6.2,
	class-transformer: 0.5.1,
	class-validator: 0.14.0,
	dotenv: 16.3.1,
	firebase-admin: "^11.11.1,
	openai: 4.25.0,
	prisma: 5.6.0,
	reflect-metadata: 0.1.13,
	rxjs: 7.8.1
