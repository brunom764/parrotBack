import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	InternalServerErrorException,
	Param,
	Post,
	Put
} from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionDto } from './dtos'

@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@HttpCode(201)
	@Post()
	async createQuestion(@Body() question: QuestionDto) {
		try {
			return this.questionService.createQuestion(question.transId, question.question)
		} catch (error) {
			throw new InternalServerErrorException('question/create-failed')
		}
	}

	@Post()
	async createSummary(@Body() data: { transId: string }) {
		try {
			return this.questionService.createSummary(data.transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/create-failed')
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
	async getSummaryById(@Param('id') id: string) {
		try {
			return this.questionService.getSummaryById(id)
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

	@Delete('delete-question/:id')
	async deleteQuestion(@Param('id') questionId: string) {
		try {
			return this.questionService.deleteQuestion(questionId)
		} catch (error) {
			throw new InternalServerErrorException('question/delete-failed')
		}
	}

	@Delete('delete-summary/:id')
	async deleteSummary(@Param('id') transId: string) {
		try {
			return this.questionService.deleteSummary(transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/delete-failed')
		}
	}
}
