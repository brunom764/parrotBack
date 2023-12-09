import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { IdentityModule } from '@core/identity/identity.module'
import { TranscriptionModule } from '@core/transcription/transcription.module'
import { QuestionModule } from '@core/question/question.module'

@Module({
	imports: [IdentityModule, TranscriptionModule, QuestionModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
