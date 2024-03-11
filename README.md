# Parrot API

Parrot API é o backend do saas **Parrot**. Um software que une inteligência artifical e áudios, fornecendo serviços como transcrição deles, resumos e perguntas e respostas.

# Features

* Usuários podem se cadastrar e fazer login em suas contas cadastradas
* Usuários autenticados podem acessar todos o serviços fornecidos:
							1. Transcrição de áudio,
							2. Gerar resumo da transcrição,
							3. Fazer perguntas sobre a transcrição

# Endpoints

| HTTP Verbs | Endpoints | Action |
| -----------| ----------| ------ |
* Identity

| POST   |   /create               | To sign up a new user account |

| POST   |   /login-with-google    | To sign up a new user account with Google |

| GET    |   /user-by-email/:email | To get user by email |

| GET    |   /user-by-id/:id       | To get user by id |

| PUT    |   /update-tier/:id      | To update tier |

| PUT    |   /update-credits/:id   | To update credits |

| DELETE |   /delete/:id           | To delete user account |

* Question
| POST   |   /create               | To create a new question |

| GET    |   /by-id/:id            | To get question by id |

| GET    |   /by-trans-id/:id      | To get question by transcription id |

| PUT    |   /update-answer/:id    | To update answer |

| DELETE |   /delete/:id           | To delete question |

* Summary
| POST   |   /create               | To create a new summary |

| GET    |   /by-id/:id            | To get summary by id |

| DELETE |   /delete/:id           | To delete summary |

* Transcription
| POST   |   /upload-audio/:id     | To create a new transcription |

| GET    |   /by-id/:id            | To get transcription by id |

| GET    |   /by-id/:id            | To get transcription by user id |

| DELETE |   /delete/:id           | To delete transcription |

## Contribuindo

Contribuições para o ParrotBack são muito bem-vindas! Se você gostaria de contribuir, siga estas instruções:

1. Faça um fork do repositório.
2. Crie sua branch de funcionalidade (`git checkout -b feature/SuaFeature`).
3. Adicione suas alterações (`git add .`).
3. Faça commits das suas alterações (`git commit -m 'Adicionando uma funcionalidade'`).
4. Faça push para a branch (`git push origin feature/SuaFeature`).
5. Crie um novo Pull Request.

# Dependencies

		@nestjs/common: ^10.2.8,
		@nestjs/config: ^3.1.1,
		@nestjs/core: ^10.2.8,
		@nestjs/cli: ^10.2.1,
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
