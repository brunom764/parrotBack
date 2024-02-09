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

		const answerText = await this.openAiService.genereateAnswer(
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

	async createSummary(transId: string) {
		const transcription = await this.transcriptionRepository.getTranscriptionById(transId)
		const summary = await this.openAiService.generateSummary(
			transcription.text as TranscriptText[]
		)
		await this.transcriptionRepository.createSummary(transId, summary)
	}

	async updateAnswer(id: string) {
		const question = await this.questionRepository.getQuestionById(id)
		const transcription = await this.transcriptionRepository.getTranscriptionById(
			question.transId
		)
		const answer = await this.openAiService.genereateAnswer(
			question.question,
			transcription.text as TranscriptText[]
		)
		await this.questionRepository.updateAnswer(question.id, answer)
	}

	async getQuestionById(id: string) {
		const question = await this.questionRepository.getQuestionById(id)
		return question
	}

	async getQuestionsByTransId(transId: string) {
		const questions = await this.questionRepository.getQuestionsByTransId(transId)
		return questions
	}

	async getSummaryById(id: string) {
		const summary = await this.transcriptionRepository.getSummaryById(id)
		return summary
	}

	async deleteQuestion(id: string) {
		await this.questionRepository.deleteQuestion(id)
	}

	async deleteSummary(id: string) {
		await this.transcriptionRepository.createSummary(id, '')
	}
}
