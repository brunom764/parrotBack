import { Transcription } from '@core/transcription/entities/index'
export interface IQuestion {
	id: string
	transId: string
	question: string
	answer: string
	createdAt: Date
	transcription: Transcription[]
}

export class Question implements IQuestion {
	id: string
	transId: string
	question: string
	answer: string
	createdAt: Date
	transcription: Transcription[]
	constructor(question: IQuestion) {
		this.id = question.id
		this.transId = question.transId
		this.question = question.question
		this.answer = question.answer
		this.createdAt = question.createdAt
		this.transcription = question.transcription
	}
}
