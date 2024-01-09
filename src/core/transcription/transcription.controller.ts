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

// ...

@Controller('transcription')
export class TranscriptionController {
	constructor(private readonly transcriptionService: TranscriptionService) {}

	@HttpCode(201)
	@Post('upload-audio/:id')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: multer.diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
			}),
			fileFilter: (req, file, cb) => {
				if (file.mimetype === 'audio/mpeg') {
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
		@Body() name: string
	): Promise<void> {
		try {
			const filePath = './uploads/' + file.filename
			await this.transcriptionService.createTranscription(filePath, userId, name)
		} catch (error) {
			throw new InternalServerErrorException('transcription/upload-failed')
		}
	}

	@Get('transcription-by-id/:id')
	async getTranscriptionById(@Param('id') id: string) {
		try {
			const transcription = await this.transcriptionService.getTranscriptionById(id)
			return transcription
		} catch (error) {
			throw new InternalServerErrorException('transcription/get-failed')
		}
	}

	@Get('transcription-by-userId/:id')
	async getTranscriptionsByUserId(@Param('id') userId: string) {
		try {
			const transcriptions =
				await this.transcriptionService.getTranscriptionsByUserId(userId)
			return transcriptions
		} catch (error) {
			throw new InternalServerErrorException('transcriptions/get-failed')
		}
	}

	@Delete('delete/:id')
	async deleteTranscription(@Param('id') id: string) {
		try {
			return await this.transcriptionService.deleteTranscription(id)
		} catch (error) {
			throw new InternalServerErrorException('transcription/delete-failed')
		}
	}
}
