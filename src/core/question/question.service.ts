import { TranscriptionDatabase } from './../../database/transcription/index'
import { QuestionDataBase } from './../../database/question/index'
import { Question } from './entities/index'
import * as uuid from 'uuid'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class QuestionService {
	constructor(
		@Inject(QuestionDataBase)
		private readonly questionDataBase: QuestionDataBase,
		@Inject(TranscriptionDatabase)
		private readonly transcriptionDataBase: TranscriptionDatabase
	) {}

	async createQuestion(transId: string, question: string) {
		try {
			const newQuestion = new Question({
				id: uuid.v4(),
				transId,
				question,
				createdAt: new Date()
			})

			//const answerText = (await this.openAiService.questionAnswer(question))
			await this.questionDataBase.createQuestion(
				newQuestion.id,
				newQuestion.transId,
				question
				//answerText
			)
		} catch (error) {
			throw new Error('question/create-failed')
		}
	}

	async createSummary(transId: string) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const transcription = this.transcriptionDataBase.getTranscriptionById(transId)
			//const summary = await this.openAiService.createSummary(transId, transcription)
			const summary = 'summary'
			await this.transcriptionDataBase.createSummary(transId, summary)
		} catch (error) {
			throw new Error('summary/create-failed')
		}
	}

	async updateAnswer(id: string) {
		try {
			const question = await this.questionDataBase.getQuestionById(id)
			//const answer = await this.openAiService.questionAnswer(question)
			const answer = 'answer'
			await this.questionDataBase.updateAnswer(question.id, answer)
		} catch (error) {
			throw new Error('answer-update/failed')
		}
	}

	async getQuestionById(id: string) {
		try {
			const question = await this.questionDataBase.getQuestionById(id)
			return question
		} catch (error) {
			throw new Error('question/get-failed')
		}
	}

	async getQuestionsByTransId(transId: string) {
		try {
			const questions = await this.questionDataBase.getQuestionsByTransId(transId)
			return questions
		} catch (error) {
			throw new Error('questions/get-failed')
		}
	}

	async getSummaryById(id: string) {
		try {
			const summary = await this.transcriptionDataBase.getSummaryById(id)
			return summary
		} catch (error) {
			throw new Error('summary/get-failed')
		}
	}

	async deleteQuestion(id: string) {
		try {
			await this.questionDataBase.deleteQuestion(id)
		} catch (error) {
			throw new Error('question-delete/failed')
		}
	}

	async deleteSummary(id: string) {
		try {
			await this.transcriptionDataBase.createSummary(id, '')
		} catch (error) {
			throw new Error('summary-delete/failed')
		}
	}
}
