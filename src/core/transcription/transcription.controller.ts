import {
	Controller,
	Post,
	HttpCode,
	Body,
	InternalServerErrorException
} from '@nestjs/common'
import { TranscriptionService } from './transcription.service'
import { TranscriptionDto } from './dtos';

@Controller('transcription')
export class TranscriptionController {
    constructor(private readonly transcriptionService: TranscriptionService) {}

    @HttpCode(201)
    @Post('create-transcription')
    async createTranscription(@Body() data: {api_token: string, file_url: string}): Promise<void> {
        try {
            return await this.transcriptionService.createTranscription(data.api_token, data.file_url);
        } catch (error) {
            throw new InternalServerErrorException('transcription/create-failed');
        }
    }
}