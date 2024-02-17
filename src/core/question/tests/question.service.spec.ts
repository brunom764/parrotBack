import { TranscriptionModule } from '@core/transcription/transcription.module'
import { QuestionService } from '../question.service'
import { QuestionRepository } from '../question.repository'
import { TranscriptionRepository } from '@core/transcription/transcription.repository'
import { TestingModule, Test } from '@nestjs/testing'
import { OpenaiService } from 'src/services/openai/openai.service'
import { OpenaiModule } from 'src/services/openai/openai.module'

jest.mock('../question.repository')
jest.mock('@core/transcription/transcription.repository')
jest.mock('src/services/openai/openai.service')

const transId = '11'
const questionText = 'question?'
const id = '1'
const summaryText = 'summary'
const answer = 'answer'
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

const question = {
	id: id,
	transId: transId,
	question: questionText,
	answer: 'answer',
	createdAt: new Date()
}

describe('QuestionService', () => {
	let service: QuestionService
	let repo: QuestionRepository
	let transRepo: TranscriptionRepository
	let openAiService: OpenaiService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TranscriptionModule, OpenaiModule],
			providers: [QuestionService, QuestionRepository, TranscriptionRepository]
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
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(transcription)
		jest.spyOn(openAiService, 'generateAnswer').mockResolvedValue(answer)
		jest.spyOn(repo, 'createQuestion').mockResolvedValue(question)

		await service.createQuestion(transId, questionText)

		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateAnswer).toHaveBeenCalledWith(
			questionText,
			transcription.text
		)
		expect(repo.createQuestion).toHaveBeenCalledWith(id, transId, questionText, answer)
	})

	it('should create a summary', async () => {
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(transcription)
		jest.spyOn(openAiService, 'generateSummary').mockResolvedValue(summaryText)
		jest.spyOn(transRepo, 'createSummary').mockResolvedValue(undefined)

		await service.createSummary(transId)

		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateSummary).toHaveBeenCalledWith(transcription.text)
		expect(transRepo.createSummary).toHaveBeenCalledWith(transId, summaryText)
	})

	it('should update answer', async () => {
		jest.spyOn(repo, 'getQuestionById').mockResolvedValue(question)
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(transcription)
		jest.spyOn(openAiService, 'generateAnswer').mockResolvedValue(answer)
		jest.spyOn(repo, 'updateAnswer').mockResolvedValue(undefined)

		await service.createSummary(transId)

		expect(repo.getQuestionById).toHaveBeenCalledWith(id)
		expect(transRepo.getTranscriptionById).toHaveBeenCalledWith(transId)
		expect(openAiService.generateAnswer).toHaveBeenCalledWith(
			question.question,
			transcription.text
		)
		expect(repo.updateAnswer).toHaveBeenCalledWith(question.id, summaryText)
	})

	it('should get question by id', async () => {
		jest.spyOn(repo, 'getQuestionById').mockResolvedValue(question)

		await service.getQuestionById(id)

		expect(repo.getQuestionById).toHaveBeenCalledWith(id)
	})

	it('should get questions by transcription id', async () => {
		const questions = [
			{
				id: transId,
				createdAt: new Date(),
				answer: answer,
				question: question.question
			}
		]
		jest.spyOn(repo, 'getQuestionsByTransId').mockResolvedValue(questions)

		await service.getQuestionsByTransId(transId)

		expect(repo.getQuestionsByTransId).toHaveBeenCalledWith(transId)
	})

	it('should get summary by id', async () => {
		const summary = [
			{
				id: '1',
				name: 'nome',
				summary: summaryText
			}
		]
		jest.spyOn(transRepo, 'getSummaryById').mockResolvedValue(summary)

		await service.getSummaryById(transId)

		expect(transRepo.getSummaryById).toHaveBeenCalledWith(transId)
	})

	it('should delete question', async () => {
		jest.spyOn(repo, 'deleteQuestion').mockResolvedValue(undefined)

		await service.deleteQuestion(id)

		expect(repo.deleteQuestion).toHaveBeenCalledWith(id)
	})

	it('should delete summary', async () => {
		jest.spyOn(transRepo, 'deleteSummary').mockResolvedValue(undefined)

		await service.deleteSummary(transId)

		expect(transRepo.deleteSummary).toHaveBeenCalledWith(transId)
	})
})
