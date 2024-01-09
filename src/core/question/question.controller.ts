import {
	Body,
	Controller,
	Get,
	HttpCode,
	InternalServerErrorException,
	Param,
	Post,
	Put
} from '@nestjs/common'
import { QuestionService } from './question.service'

@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@HttpCode(201)
	@Post()
	async createQuestion(@Body() body: { transId: string; question: string }) {
		try {
			return this.questionService.createQuestion(body.transId, body.question)
		} catch (error) {
			throw new InternalServerErrorException('question/create-failed')
		}
	}

	@Get('question-by-id/:id')
	async getQuestionById(@Param('id') id: string) {
		try {
			return this.questionService.getQuestionById(id)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-id-failed')
		}
	}

	@Get('questions/:id')
	async getQuestionsByTransId(@Param('id') transId: string) {
		try {
			return this.questionService.getQuestionsByTransId(transId)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-transId-failed')
		}
	}

	@Get('summary/:id')
	async getSummaryByTransId(@Param('id') transId: string) {
		try {
			return this.questionService.getSummaryByTransId(transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/get-by-transId-failed')
		}
	}

	@Put('update-answer/:id')
	async updateAnswer(@Param('id') questionId: string) {
		try {
			return this.questionService.updateAnswer(questionId)
		} catch (error) {
			throw new InternalServerErrorException('question/update-answer-failed')
		}
	}
}
