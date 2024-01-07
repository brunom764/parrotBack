import { Question } from '@core/question/entities'

export type TranscriptText = {
	confidence: number
	end: number
	speaker: string
	start: number
	text: string
}

export interface ITranscription {
	id: string
	userId: string
	name: string
	duration?: number
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
	questions: Question[]
}

export class Transcription implements ITranscription {
	id: string
	userId: string
	name: string
	duration?: number
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
	questions: Question[]
	constructor(transcription: ITranscription) {
		this.id = transcription.id
		this.userId = transcription.userId
		this.name = transcription.name
		this.text = transcription.text
		this.summary = transcription.summary
		this.createdAt = transcription.createdAt
		this.questions = transcription.questions
	}
}
