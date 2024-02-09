import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeFirebase } from './firebase.config'
import * as express from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(express.json({ limit: '50mb' }))
	app.use(express.urlencoded({ limit: '50mb', extended: false }))
	app.enableCors()
	const config = new DocumentBuilder()
		.setTitle('Parrot API')
		.setDescription('The parrot API description')
		.setVersion('1.0')
		.addTag('parrot')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(process.env.PORT || 3000)
}
bootstrap()
initializeFirebase()
