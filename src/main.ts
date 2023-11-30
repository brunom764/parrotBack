import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeFirebase } from './firebase.config'
import * as express from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(express.json({ limit: '50mb' }))
	app.use(express.urlencoded({ limit: '50mb', extended: false }))
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(process.env.PORT || 3000)
}
bootstrap()
initializeFirebase()
