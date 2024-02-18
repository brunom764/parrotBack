import { Test, TestingModule } from '@nestjs/testing'
import { OpenaiService } from 'src/services/openai/openai.service'
import { SummaryService } from '../summary.service'
import { SummaryRepository } from '../summary.repository'

jest.mock('../summary.repository')
jest.mock('src/services/openai/openai.service')

const transId = '1'
const summaryText = 'This is a summary'
const summary = {
	id: transId,
	name: 'Transcription',
	summary: summaryText
}
const transcription = {
	userId: 'userId',
	text: [
		{
			confidence: '0',
			end: '0',
			speaker: 'A',
			start: '0',
			text: 'text'
		}
	],
	id: transId,
	name: 'nome',
	duration: 0,
	createdAt: new Date()
}

describe('SummaryService', () => {
	let service: SummaryService
	let repo: SummaryRepository
	let openAiService: OpenaiService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SummaryService, SummaryRepository, OpenaiService]
		}).compile()

		service = module.get<SummaryService>(SummaryService)
		repo = module.get<SummaryRepository>(SummaryRepository)
		openAiService = module.get<OpenaiService>(OpenaiService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a summary', async () => {
		jest.spyOn(repo, 'getTranscriptionById').mockResolvedValue(transcription)
		jest.spyOn(openAiService, 'generateSummary').mockResolvedValue(summaryText)
		jest.spyOn(repo, 'createSummary').mockResolvedValue(undefined)

		await service.createSummary(transId)

		expect(repo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateSummary).toHaveBeenCalledWith(transcription.text)
		expect(repo.createSummary).toHaveBeenCalledWith(transId, summary.summary)
	})

	it('should get summary by id', async () => {
		jest.spyOn(repo, 'getSummaryById').mockResolvedValue(summary)

		const result = await service.getSummaryById(transId)

		expect(repo.getSummaryById).toHaveBeenCalledWith(transId)
		expect(result).toEqual(summary)
	})

	it('should delete summary', async () => {
		jest.spyOn(repo, 'deleteSummary').mockResolvedValue(undefined)

		await service.deleteSummary(transId)

		expect(repo.deleteSummary).toHaveBeenCalledWith(transId)
	})
})
