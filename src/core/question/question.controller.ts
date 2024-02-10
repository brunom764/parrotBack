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
import { CreateSummaryDto, QuestionDto } from './dtos'
import {
	INTERNAL_SERVER_ERROR_API_RESPONSE,
	BAD_REQUEST_API_RESPONSE,
	CREATE_QUESTION_API_RESPONSE,
	CREATE_SUMMARY_DTO_API_RESPONSE,
	GET_QUESTION_API_RESPONSE,
	NOT_FOUND_API_RESPONSE,
	QUESTION_ID_PARAM,
	SUMMARY_ID_PARAM,
	GET_SUMMARY_API_RESPONSE,
	UPDATE_ANSWER_API_RESPONSE,
	DELETE_QUESTION_API_RESPONSE,
	TRANS_ID_PARAM,
	DELETE_SUMMARY_API_RESPONSE
} from '@core/common/docs/constants'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiResponse(INTERNAL_SERVER_ERROR_API_RESPONSE)
@ApiResponse(BAD_REQUEST_API_RESPONSE)
@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@HttpCode(201)
	@ApiBody({ type: QuestionDto })
	@ApiResponse(CREATE_QUESTION_API_RESPONSE)
	@Post('create-question')
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

	@ApiBody({ type: CreateSummaryDto })
	@ApiResponse(CREATE_SUMMARY_DTO_API_RESPONSE)
	@Post('create-summary')
	async createSummary(@Body() data: CreateSummaryDto) {
		try {
			return await this.questionService.createSummary(data.transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/create-failed')
		}
	}

	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(GET_QUESTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('question-by-id/:id')
	async getQuestionById(@Param('id') id: string) {
		try {
			return await this.questionService.getQuestionById(id)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-id-failed')
		}
	}

	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(GET_QUESTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('questions/:id')
	async getQuestionsByTransId(@Param('id') transId: string) {
		try {
			return await this.questionService.getQuestionsByTransId(transId)
		} catch (error) {
			throw new InternalServerErrorException('question/get-by-transId-failed')
		}
	}

	@ApiParam(SUMMARY_ID_PARAM)
	@ApiResponse(GET_SUMMARY_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('summary/:id')
	async getSummaryById(@Param('id') id: string) {
		try {
			return await this.questionService.getSummaryById(id)
		} catch (error) {
			throw new InternalServerErrorException('summary/get-by-transId-failed')
		}
	}

	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(UPDATE_ANSWER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Put('update-answer/:id')
	async updateAnswer(@Param('id') questionId: string) {
		try {
			return await this.questionService.updateAnswer(questionId)
		} catch (error) {
			throw new InternalServerErrorException('question/update-answer-failed')
		}
	}

	@ApiParam(QUESTION_ID_PARAM)
	@ApiResponse(DELETE_QUESTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete('question/:id')
	async deleteQuestion(@Param('id') questionId: string) {
		try {
			return await this.questionService.deleteQuestion(questionId)
		} catch (error) {
			throw new InternalServerErrorException('question/delete-failed')
		}
	}

	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(DELETE_SUMMARY_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete('summary/:id')
	async deleteSummary(@Param('id') transId: string) {
		try {
			return await this.questionService.deleteSummary(transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/delete-failed')
		}
	}
}
