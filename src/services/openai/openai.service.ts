/* eslint-disable @typescript-eslint/no-unused-vars */
import { TranscriptText } from '@core/transcription/entities'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OpenaiService {
	api_token: string = process.env.OPENAI_API_TOKEN

	async genereateAnswer(question: string, context: TranscriptText[]) {
		return 'answer'
	}

	async generateSummary(context: TranscriptText[]) {
		return 'sumarry'
	}
}
