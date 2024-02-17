import { QuestionService } from '../question.service'
import { QuestionRepository } from '../question.repository'
import { TranscriptionRepository } from '@core/transcription/transcription.repository'
import { TestingModule, Test } from '@nestjs/testing'
import { OpenaiService } from 'src/services/openai/openai.service'

jest.mock('../question.repository')
jest.mock('@core/transcription/transcription.repository')
jest.mock('src/services/openai/openai.service')

const transId = 'transId'
const question = 'question?'
const id = 'questionId'
const summary = 'summary'
const transcription = {
	name: 'nome',
	id: transId,
	createdAt: new Date(),
	userId: 'userId',
	text: {
		confidence: 0,
		end: 0,
		speaker: 'A',
		start: 0,
		text: 'text'
	},
	duration: 0
}

describe('QuestionService', () => {
	let service: QuestionService
	let repo: QuestionRepository
	let transRepo: TranscriptionRepository
	let openAiService: OpenaiService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [QuestionService, QuestionRepository]
		}).compile()

		service = module.get<QuestionService>(QuestionService)
		repo = module.get<QuestionRepository>(QuestionRepository)
		transRepo = module.get<TranscriptionRepository>(TranscriptionRepository)
		openAiService = module.get<OpenaiService>(OpenaiService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a question', async () => {
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(undefined)
		jest.spyOn(openAiService, 'generateAnswer').mockResolvedValue(undefined)
		jest.spyOn(repo, 'createQuestion').mockResolvedValue(undefined)

		await service.createQuestion(transId, question)

		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateAnswer).toHaveBeenCalledWith(
			question,
			transcription.text
		)
		expect(repo.createQuestion).toHaveBeenCalledWith(id, transId, question)
	})

	it('should create a summary', async () => {
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(undefined)
		jest.spyOn(openAiService, 'generateSummary').mockResolvedValue(undefined)
		jest.spyOn(transRepo, 'createSummary').mockResolvedValue(undefined)

		await service.createSummary(transId)

		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateSummary).toHaveBeenCalledWith(transcription.text)
		expect(transRepo.createSummary).toHaveBeenCalledWith(transId, summary)
	})

	it('should update answer', async () => {
		jest.spyOn(repo, 'getQuestionById').mockResolvedValue(undefined)
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(undefined)
		jest.spyOn(openAiService, 'generateAnswer').mockResolvedValue(undefined)
		jest.spyOn(repo, 'updateAnswer').mockResolvedValue(undefined)

		await service.createSummary(transId)

		expect(repo.getQuestionById).toHaveBeenCalledWith(id)
		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateAnswer).toHaveBeenCalledWith(
			question,
			transcription.text
		)
		expect(repo.updateAnswer).toHaveBeenCalledWith(id, summary)
	})

	it('should get question by id', async () => {
		jest.spyOn(repo, 'getQuestionById').mockResolvedValue(undefined)

		await service.getQuestionById(id)

		expect(repo.getQuestionById).toHaveBeenCalledWith(id)
	})

	it('should get questions by transcription id', async () => {
		jest.spyOn(repo, 'getQuestionsByTransId').mockResolvedValue(undefined)

		await service.getQuestionsByTransId(transId)

		expect(repo.getQuestionsByTransId).toHaveBeenCalledWith(transId)
	})

	it('should get summary by id', async () => {
		jest.spyOn(transRepo, 'getSummaryById').mockResolvedValue(undefined)

		await service.getSummaryById(id)

		expect(transRepo.getSummaryById).toHaveBeenCalledWith(id)
	})

	it('should delete question by id', async () => {
		jest.spyOn(repo, 'deleteQuestion').mockResolvedValue(undefined)

		await service.deleteQuestion(id)

		expect(repo.deleteQuestion).toHaveBeenCalledWith(id)
	})

	it('should delete summary by id', async () => {
		jest.spyOn(transRepo, 'createSummary').mockResolvedValue(undefined)

		await service.deleteSummary(id)

		expect(transRepo.createSummary).toHaveBeenCalledWith(id, '')
	})
})
