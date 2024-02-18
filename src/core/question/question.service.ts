import { Question } from './entities/index'
import * as uuid from 'uuid'
import { Inject, Injectable } from '@nestjs/common'
import { OpenaiService } from 'src/services/openai/openai.service'
import { TranscriptText } from '@core/transcription/entities'
import { QuestionRepository } from './question.repository'
import { TranscriptionRepository } from '@core/transcription/transcription.repository'

@Injectable()
export class QuestionService {
	constructor(
		@Inject(QuestionRepository)
		private readonly questionRepository: QuestionRepository,
		@Inject(TranscriptionRepository)
		private readonly transcriptionRepository: TranscriptionRepository,
		@Inject(OpenaiService)
		private readonly openAiService: OpenaiService
	) {}

	async createQuestion(transId: string, question: string) {
		const newQuestion = new Question({
			id: uuid.v4(),
			transId,
			question,
			createdAt: new Date()
		})

		const transcription = await this.transcriptionRepository.getTranscriptionById(transId)

		if (!transcription) {
			throw new Error('transcription/not-found')
		}

		const answerText = await this.openAiService.generateAnswer(
			question,
			transcription.text as TranscriptText[]
		)
		return await this.questionRepository.createQuestion(
			newQuestion.id,
			newQuestion.transId,
			question,
			answerText
		)
	}

	async updateAnswer(id: string) {
		const question = await this.questionRepository.getQuestionById(id)
		const transcription = await this.transcriptionRepository.getTranscriptionById(
			question.transId
		)
		if (!transcription) {
			throw new Error('transcription/not-found')
		}
		const answer = await this.openAiService.generateAnswer(
			question.question,
			transcription.text as TranscriptText[]
		)
		return await this.questionRepository.updateAnswer(question.id, answer)
	}

	async getQuestionById(id: string) {
		return await this.questionRepository.getQuestionById(id)
	}

	async getQuestionsByTransId(transId: string) {
		return await this.questionRepository.getQuestionsByTransId(transId)
	}

	async deleteQuestion(id: string) {
		await this.questionRepository.deleteQuestion(id)
	}
}
