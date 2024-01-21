/* eslint-disable @typescript-eslint/no-unused-vars */
import { TranscriptText } from '@core/transcription/entities'
import { Injectable } from '@nestjs/common'
import { OpenAI } from "openai";

const openai = new OpenAI();

@Injectable()
export class OpenaiService {
	api_token: string = process.env.OPENAI_API_TOKEN

	async genereateAnswer(question: string, context: TranscriptText[]) {
		const answer = await openai.chat.completion.create({
			messages: [{role: "system", content: `Responda ${question} com base no texto: ${context}`}],
			model: "gpt-3.5-turbo"
		})
		return answer.choices[0].message.context
	}

	async generateSummary(context: TranscriptText[]) {
		const sumarry = await openai.chat.completion.create({
			messages: [{role: "system", content: `Por favor resuma este texto, tomando cuidado
			para não perder o contexto: ${context}`}],
			model: "gpt-3.5-turbo"
		})
		return sumarry.choices[0].message.context
	}
}
