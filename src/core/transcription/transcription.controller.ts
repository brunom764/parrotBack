import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	InternalServerErrorException,
	Param,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as multer from 'multer'
import { TranscriptionService } from './transcription.service'
import {
	BAD_REQUEST_API_RESPONSE,
	CREATE_TRANSCRIPTION_API_RESPONSE,
	DELETE_TRANSCRIPTION_API_RESPONSE,
	GET_TRANSCRIPTION_API_RESPONSE,
	INTERNAL_SERVER_ERROR_API_RESPONSE,
	NOT_FOUND_API_RESPONSE,
	TRANS_ID_PARAM,
	USER_ID_PARAM
} from '@core/common/docs/constants'
import { CreateTranscriptionDto } from './dtos'
import { ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'

@ApiResponse(INTERNAL_SERVER_ERROR_API_RESPONSE)
@ApiResponse(BAD_REQUEST_API_RESPONSE)
@Controller('transcription')
export class TranscriptionController {
	constructor(private readonly transcriptionService: TranscriptionService) {}

	@HttpCode(201)
	@ApiParam(TRANS_ID_PARAM)
	@ApiBody({ type: CreateTranscriptionDto })
	@ApiResponse(CREATE_TRANSCRIPTION_API_RESPONSE)
	@Post('upload-audio/:id')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: multer.diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
			}),
			fileFilter: (req, file, cb) => {
				if (file.mimetype.startsWith('audio/')) {
					cb(null, true)
				} else {
					cb(new BadRequestException('Invalid file type'), false)
				}
			}
		})
	)
	async uploadAudio(
		@UploadedFile() file,
		@Param('id') userId: string,
		@Body('name') data: CreateTranscriptionDto
	): Promise<void> {
		try {
			const filePath = './uploads/' + file.filename
			await this.transcriptionService.createTranscription(filePath, userId, data.name)
		} catch (error) {
			throw new InternalServerErrorException('transcription/upload-failed')
		}
	}

	@ApiParam(TRANS_ID_PARAM)
	@ApiResponse(GET_TRANSCRIPTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('by-id/:id')
	async getTranscriptionById(@Param('id') id: string) {
		try {
			const transcription = await this.transcriptionService.getTranscriptionById(id)
			return transcription
		} catch (error) {
			throw new InternalServerErrorException('transcription/get-failed')
		}
	}

	@ApiParam(USER_ID_PARAM)
	@ApiResponse(GET_TRANSCRIPTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('by-userId/:id')
	async getTranscriptionsByUserId(@Param('id') userId: string) {
		try {
			const transcriptions =
				await this.transcriptionService.getTranscriptionsByUserId(userId)
			return transcriptions
		} catch (error) {
			throw new InternalServerErrorException('transcriptions/get-failed')
		}
	}

	@ApiParam(USER_ID_PARAM)
	@ApiResponse(DELETE_TRANSCRIPTION_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete(':id')
	async deleteTranscription(@Param('id') id: string) {
		try {
			return await this.transcriptionService.deleteTranscription(id)
		} catch (error) {
			throw new InternalServerErrorException('transcription/delete-failed')
		}
	}
}
