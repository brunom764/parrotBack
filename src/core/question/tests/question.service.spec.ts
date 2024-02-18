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
const answer = 'answer'
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	it('should not create a question', async () => {
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(undefined)

		await expect(service.createQuestion(transId, questionText)).rejects.toThrow(
			'transcription/not-found'
		)
	})

	it('should not update answer', async () => {
		jest.spyOn(transRepo, 'getTranscriptionById').mockResolvedValue(undefined)

		await expect(service.createQuestion(transId, questionText)).rejects.toThrow(
			'transcription/not-found'
		)
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

	it('should delete question', async () => {
		jest.spyOn(repo, 'deleteQuestion').mockResolvedValue(undefined)

		await service.deleteQuestion(id)

		expect(repo.deleteQuestion).toHaveBeenCalledWith(id)
	})
})
