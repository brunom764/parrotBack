import { Module } from '@nestjs/common'
import { IdentityModule } from '@core/identity/identity.module'
import { TranscriptionModule } from '@core/transcription/transcription.module'
import { QuestionModule } from '@core/question/question.module'
import { PrismaModule } from './services/prisma/prisma.module'

@Module({
	imports: [IdentityModule, TranscriptionModule, QuestionModule, PrismaModule],
	controllers: [],
	providers: []
})
export class AppModule {}
