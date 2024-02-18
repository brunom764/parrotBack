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
import { QuestionDto } from './dtos'
import {
	INTERNAL_SERVER_ERROR_API_RESPONSE,
	BAD_REQUEST_API_RESPONSE,
	CREATE_QUESTION_API_RESPONSE,
	GET_QUESTION_API_RESPONSE,
	NOT_FOUND_API_RESPONSE,
	QUESTION_ID_PARAM,
	UPDATE_ANSWER_API_RESPONSE,
	DELETE_QUESTION_API_RESPONSE,
	GET_QUESTIONS_API_RESPONSE,
	TRANS_ID_PARAM
} from '@core/common/docs/constants'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { QuestionService } from './question.service'

@ApiResponse(INTERNAL_SERVER_ERROR_API_RESPONSE)
@ApiResponse(BAD_REQUEST_API_RESPONSE)
@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@HttpCode(201)
	@ApiBody({ type: QuestionDto })
	@ApiResponse(CREATE_QUESTION_API_RESPONSE)
	@Post('create')
	async createQuestion(@Body() question: QuestionDto) {
		try {
			return await this.questionService.createQuestion(
				question.transId,
				question.question
			)
		} catch (error) {
			throw new InternalServerErrorException('question/create-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(GET_QUESTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('by-id/:id')
	async getQuestionById(@Param('id') id: string) {
		try {
			return await this.questionService.getQuestionById(id)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-id-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(GET_QUESTIONS_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('by-trans-id/:id')
	async getQuestionsByTransId(@Param('id') id: string) {
		try {
			return await this.questionService.getQuestionsByTransId(id)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-transId-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(UPDATE_ANSWER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Put('update-answer/:id')
	async updateAnswer(@Param('id') id: string) {
		try {
			return await this.questionService.updateAnswer(id)
		} catch (error) {
			throw new InternalServerErrorException('question/update-answer-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(DELETE_QUESTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete(':id')
	async deleteQuestion(@Param('id') id: string) {
		try {
			return await this.questionService.deleteQuestion(id)
		} catch (error) {
			throw new InternalServerErrorException('question/delete-failed')
		}
	}
}
