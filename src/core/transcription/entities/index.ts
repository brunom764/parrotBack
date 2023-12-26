export type TranscriptText = {
	text: string
	start: number
	end: number
	speaker: number
}

export interface ITranscription {
	id: string
	userId: string
	fileUrl: string
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
	//questions?: Question[]
}

export class Transcription implements ITranscription {
	id: string
	userId: string
	fileUrl: string
	text?: TranscriptText[]
	createdAt: Date
	summary?: string
	//questions?: Question[]
	constructor(transcription: ITranscription) {
		this.id = transcription.id
		this.userId = transcription.userId
		this.fileUrl = transcription.fileUrl
		this.text = transcription.text
		this.summary = transcription.summary
		this.createdAt = transcription.createdAt
		//this.questions = transcription.questions
	}
}
