import { PrismaService } from 'src/services/prisma.service'
import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionDataBase } from 'src/database/question'
import { QuestionController } from './question.controller'

@Module({
	controllers: [QuestionController],
	providers: [QuestionService, PrismaService, QuestionDataBase],
	exports: [QuestionService]
})
export class QuestionModule {}
