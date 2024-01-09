import { PrismaService } from 'src/services/prisma.service'
import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionDataBase } from 'src/database/question'
import { QuestionController } from './question.controller'
import { TranscriptionDatabase } from 'src/database/transcription'

@Module({
	controllers: [QuestionController],
	providers: [QuestionService, PrismaService, QuestionDataBase, TranscriptionDatabase],
	exports: [QuestionService]
})
export class QuestionModule {}
