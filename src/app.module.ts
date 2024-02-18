import { Module } from '@nestjs/common'
import { IdentityModule } from '@core/identity/identity.module'
import { TranscriptionModule } from '@core/transcription/transcription.module'
import { QuestionModule } from '@core/question/question.module'
import { PrismaModule } from './services/prisma/prisma.module'
import { FirebaseModule } from './services/firebase/firebase.module'
import { SummaryModule } from '@core/summary/summary.module'

@Module({
	imports: [
		IdentityModule,
		TranscriptionModule,
		QuestionModule,
		SummaryModule,
		PrismaModule,
		FirebaseModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
