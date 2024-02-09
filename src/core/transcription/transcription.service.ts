import { Inject, Injectable } from '@nestjs/common'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'
import { Transcription } from './entities'
import * as uuid from 'uuid'
import { ITranscript } from 'src/services/assemblyworker/assembly.interface'
import { TranscriptionRepository } from './transcription.repository'

@Injectable()
export class TranscriptionService {
	constructor(
		@Inject(AssemblyService) private readonly assemblyService: AssemblyService,
		@Inject(TranscriptionRepository)
		private readonly transcriptionRepository: TranscriptionRepository
	) {}

	async createTranscription(fileUrl: string, userId: string, name: string) {
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
			await this.transcriptionRepository.createTranscription(
				newTranscription.id,
				newTranscription.userId,
				newTranscription.name,
				transcriptionInfo.audio_duration,
				transcriptionText
			)
		} else {
			throw new Error('transcription/upload-audio-failed')
		}
	}

	async getTranscriptionById(id: string) {
		const transcription = await this.transcriptionRepository.getTranscriptionById(id)
		return transcription
	}

	async getTranscriptionsByUserId(userId: string) {
		const transcriptions =
			await this.transcriptionRepository.getTranscriptionsByUserId(userId)
		return transcriptions
	}

	async deleteTranscription(id: string) {
		await this.transcriptionRepository.deleteTranscription(id)
	}
}
