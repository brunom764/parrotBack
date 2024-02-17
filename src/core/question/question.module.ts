import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { OpenaiModule } from 'src/services/openai/openai.module'
import { TranscriptionRepository } from '@core/transcription/transcription.repository'
import { QuestionRepository } from './question.repository'

@Module({
	imports: [OpenaiModule],
	controllers: [QuestionController],
	providers: [QuestionService, QuestionRepository, TranscriptionRepository],
	exports: [QuestionService]
})
export class QuestionModule {}
