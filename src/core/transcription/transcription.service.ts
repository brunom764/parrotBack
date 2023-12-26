import { Inject, Injectable } from '@nestjs/common'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'
import { TranscriptText, Transcription } from './entities'
import * as uuid from 'uuid'
import { TranscriptionDatabase } from 'src/database/transcription'

@Injectable()
export class TranscriptionService {
	constructor(
		@Inject(AssemblyService) private readonly assemblyService: AssemblyService,
		@Inject(TranscriptionDatabase)
		private readonly transcriptionDatabase: TranscriptionDatabase
	) {}

	async createTranscription(fileUrl: string, userId: string) {
		try {
			const newTranscription = new Transcription({
				id: uuid.v4(),
				userId,
				fileUrl,
				createdAt: new Date()
			})
			const audioUrl = await this.assemblyService.upload_file(fileUrl)

			if (audioUrl) {
				const text = (await this.assemblyService.transcribeAudio(
					fileUrl
				)) as TranscriptText[]
				await this.transcriptionDatabase.createTranscription(
					newTranscription.id,
					newTranscription.userId,
					newTranscription.fileUrl,
					text
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
