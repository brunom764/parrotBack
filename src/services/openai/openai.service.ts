import { TranscriptText } from '@core/transcription/entities'
import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenaiService {
	private readonly openai = new OpenAI()

	constructor() {
		this.openai.apiKey = process.env.OPENAI_API_TOKEN
	}

	async generateAnswer(question: string, context: TranscriptText[]) {
		const answer = await this.openai.chat.completions.create({
			messages: [
				{ role: 'system', content: `Responda ${question} com base no texto: ${context}` }
			],
			model: 'gpt-3.5-turbo'
		})
		return answer.choices[0].message.content
	}

	async generateSummary(context: TranscriptText[]) {
		const sumarry = await this.openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `Por favor resuma este texto, tomando cuidado
			para não perder o contexto: ${context}`
				}
			],
			model: 'gpt-3.5-turbo'
		})
		return sumarry.choices[0].message.content
	}
}
