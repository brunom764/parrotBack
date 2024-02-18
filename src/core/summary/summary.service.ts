import { Inject, Injectable } from '@nestjs/common'
import { OpenaiService } from 'src/services/openai/openai.service'
import { SummaryRepository } from './summary.repositoy'
import { TranscriptText } from '@core/transcription/entities'

@Injectable()
export class SummaryService {
	constructor(
		@Inject(SummaryRepository)
		private readonly summaryRepository: SummaryRepository,
		@Inject(OpenaiService)
		private readonly openAiService: OpenaiService
	) {}

	async createSummary(transId: string) {
		const transcription = await this.summaryRepository.getTranscriptionById(transId)
		const summary = await this.openAiService.generateSummary(
			transcription.text as TranscriptText[]
		)
		return await this.summaryRepository.createSummary(transId, summary)
	}

	async getSummaryById(id: string) {
		return await this.summaryRepository.getSummaryById(id)
	}

	async deleteSummary(transId: string) {
		await this.summaryRepository.deleteSummary(transId)
	}
}
