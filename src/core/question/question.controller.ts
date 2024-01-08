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
	@Post('create')
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

	@Get('question-by-transId/:transId')
	async getQuestionsByTransId(@Param('transId') transId: string) {
		try {
			return this.questionService.getQuestionsByTransId(transId)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-transId-failed')
		}
	}

	@Get('summary-by-transId/:transId')
	async getSummaryByTransId(@Param('transId') transId: string) {
		try {
			return this.questionService.getSummaryByTransId(transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/get-by-transId-failed')
		}
	}

	@Put('update-answer/:id')
	async updateAnswer(
		@Param('id') id: string,
		@Body() body: { id: string; answer: string }
	) {
		try {
			return this.questionService.updateAnswer(body.id, body.answer)
		} catch (error) {
			throw new InternalServerErrorException('question/update-answer-failed')
		}
	}
}
