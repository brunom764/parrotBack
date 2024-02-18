import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	InternalServerErrorException,
	Param,
	Post
} from '@nestjs/common'
import {
	INTERNAL_SERVER_ERROR_API_RESPONSE,
	BAD_REQUEST_API_RESPONSE,
	CREATE_SUMMARY_DTO_API_RESPONSE,
	NOT_FOUND_API_RESPONSE,
	GET_SUMMARY_API_RESPONSE,
	TRANS_ID_PARAM,
	DELETE_SUMMARY_API_RESPONSE
} from '@core/common/docs/constants'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreateSummaryDto } from './dtos'
import { SummaryService } from './summary.service'

@ApiResponse(INTERNAL_SERVER_ERROR_API_RESPONSE)
@ApiResponse(BAD_REQUEST_API_RESPONSE)
@Controller('summary')
export class SummaryController {
	constructor(private readonly summaryService: SummaryService) {}

	@HttpCode(201)
	@ApiBody({ type: CreateSummaryDto })
	@ApiResponse(CREATE_SUMMARY_DTO_API_RESPONSE)
	@Post('create')
	async createSummary(@Body() data: CreateSummaryDto) {
		try {
			return await this.summaryService.createSummary(data.transId)
		} catch (error) {
			throw new InternalServerErrorException('summary/create-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(GET_SUMMARY_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('/:id')
	async getSummaryById(@Param('id') id: string) {
		try {
			return await this.summaryService.getSummaryById(id)
		} catch (error) {
			throw new InternalServerErrorException('summary/get-by-transId-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(DELETE_SUMMARY_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete('/:id')
	async deleteSummary(@Param('id') id: string) {
		try {
			return await this.summaryService.deleteSummary(id)
		} catch (error) {
			throw new InternalServerErrorException('summary/delete-failed')
		}
	}
}
