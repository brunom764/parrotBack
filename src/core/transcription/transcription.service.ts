import { Inject, Injectable } from '@nestjs/common'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'
import { Transcription } from './entities'
import * as uuid from 'uuid'
import { TranscriptionDatabase } from 'src/database/transcription'
import { ITranscript } from 'src/services/assemblyworker/assembly.interface'

@Injectable()
export class TranscriptionService {
	constructor(
		@Inject(AssemblyService) private readonly assemblyService: AssemblyService,
		@Inject(TranscriptionDatabase)
		private readonly transcriptionDatabase: TranscriptionDatabase
	) {}

	async createTranscription(fileUrl: string, userId: string, name: string) {
		try {
			const newTranscription = new Transcription({
				id: uuid.v4(),
				userId,
				name,
				createdAt: new Date()
			})
			const audioUrl = await this.assemblyService.upload_file(fileUrl)

			if (audioUrl) {
				const transcriptionInfo = (await this.assemblyService.transcribeAudio(
					fileUrl
				)) as ITranscript
				const transcriptionText = transcriptionInfo.utterances.map((utterance) => {
					return {
						confidence: utterance.confidence,
						end: utterance.end,
						speaker: utterance.speaker,
						start: utterance.start,
						text: utterance.text
					}
				})
				await this.transcriptionDatabase.createTranscription(
					newTranscription.id,
					newTranscription.userId,
					newTranscription.name,
					transcriptionInfo.audio_duration,
					transcriptionText
				)
			} else {
				throw new Error('transcription/upload-failed')
			}
		} catch (error) {
			throw new Error('transcription/create-failed')
		}
	}

	async getTranscriptionById(id: string) {
		try {
			const transcription = await this.transcriptionDatabase.getTranscriptionById(id)
			return transcription
		} catch (error) {
			throw new Error('transcription/get-failed')
		}
	}

	async getTranscriptionsByUserId(userId: string) {
		try {
			const transcriptions =
				await this.transcriptionDatabase.getTranscriptionsByUserId(userId)
			return transcriptions
		} catch (error) {
			throw new Error('transcriptions/get-failed')
		}
	}
}
