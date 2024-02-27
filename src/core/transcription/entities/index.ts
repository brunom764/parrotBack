export type TranscriptText = {
	confidence: number
	end: number
	speaker: string
	start: number
	text: string
}

export interface ITranscription {
	id?: string
	userId: string
	name: string
	duration?: number
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
}

export class Transcription implements ITranscription {
	id: string
	userId: string
	name: string
	duration?: number
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
	constructor(transcription: ITranscription) {
		this.id = transcription.id
		this.userId = transcription.userId
		this.name = transcription.name
		this.text = transcription.text
		this.summary = transcription.summary
		this.createdAt = transcription.createdAt
	}
}
