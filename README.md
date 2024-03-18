# Parrot - BackEnd

Backend do saas Parrot. Um software que une inteligência artifical e áudios, fornecendo serviços como transcrição deles, resumos e perguntas e respostas.

![image](https://github.com/brunom764/parrotBack/assets/111246423/867dcbfa-9875-4267-ab4a-80b5da88c501)


API hospedada em: [https://parrot-nwqy.onrender.com](https://parrot-nwqy.onrender.com)

# Documentação
![image](https://github.com/brunom764/parrotBack/assets/111246423/1479de61-d6de-4847-8e15-641cb01f8ad2)

Documentação disponível em: [https://parrot-nwqy.onrender.com/docs](https://parrot-nwqy.onrender.com/docs)

# Features

* Usuários podem se cadastrar e fazer login em suas contas cadastradas ou pelo Google;
* Usuários autenticados podem acessar todos o serviços fornecidos.

		1. Transcrição de áudio;

		2. Gerar resumo da transcrição;

		3. Fazer perguntas sobre a transcrição.

A transcrição é gerada através da API do [AssemblyAI](https://www.assemblyai.com/docs).

O resumo e as respostas das perguntas feitas pelos usuários são gerados através da API da [OpenAI](https://platform.openai.com/docs/introduction).

## Contributing

Contribuições para o Parrot são muito bem-vindas! Se você gostaria de contribuir, siga estas instruções:

1. Faça um fork do repositório;
2. Crie sua branch de funcionalidade (`git checkout -b feature/SuaFeature`);
3. Adicione suas alterações (`git add .`);
3. Faça commits das suas alterações (`git commit -m 'Adicionando uma funcionalidade'`);
4. Faça push para a branch (`git push origin feature/SuaFeature`);
5. Crie um novo Pull Request.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start:dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Dependecies

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
	firebase-admin: 11.11.1,
	openai: 4.25.0,
	prisma: 5.6.0,
	reflect-metadata: 0.1.13,
	rxjs: 7.8.1
