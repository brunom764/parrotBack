import { TranscriptText } from '@core/transcription/entities'
import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenaiService {
	private readonly openai = new OpenAI()

	constructor() {
		this.openai.apiKey = process.env.OPENAI_API_KEY
	}

	async generateAnswer(question: string, context: TranscriptText[]) {
		try {
			const adaptedContext = this.adaptContext(context)
			const answer = await this.openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: `Responda ${question} com base no texto: ${adaptedContext}.`
					}
				],
				model: 'gpt-4'
			})
			return answer.choices[0].message.content
		} catch (error) {
			console.log(error)
			throw new Error('openai/generate-answer-failed')
		}
	}

	async generateSummary(context: TranscriptText[]) {
		try {
			const adaptedContext = this.adaptContext(context)
			const sumarry = await this.openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: `Por favor resuma este texto, tomando cuidado
				para não perder o contexto: ${adaptedContext}`
					}
				],
				model: 'gpt-4'
			})
			return sumarry.choices[0].message.content
		} catch (error) {
			throw new Error('openai/generate-summary-failed')
		}
	}

	adaptContext(context: TranscriptText[]) {
		return context
			.map((speak) => `Pessoa ${speak.speaker}: ${speak.text}`)
			.join('/n' + ' ')
	}
}
