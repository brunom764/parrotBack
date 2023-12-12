import { User } from "@core/identity/entities"

export interface iTranscription{
    id: string
    userId: string
    textFile: string
    summary: string
    createdAt: Date
    user: User     
    //questions: Question[]
}

export class Transcription implements iTranscription {
    id: string
    userId: string
    textFile: string
    summary: string
    createdAt: Date
    user: User     
    //questions: Question[]
    constructor(transcription: iTranscription){
        this.id = transcription.id
        this.userId = transcription.userId
        this.textFile = transcription.textFile
        this.summary = transcription.summary
        this.createdAt = transcription.createdAt
        this.user = transcription.user
        //this.questions = transcription.questions
    }
}