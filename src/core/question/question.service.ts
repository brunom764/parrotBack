import { QuestionDataBase } from './../../database/question/index'
import { Question } from './entities/index'
import * as uuid from 'uuid'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class QuestionService {
	constructor(
		@Inject(QuestionDataBase)
		private readonly questionDataBase: QuestionDataBase
	) {}

	async createQuestion(transId: string, question: string) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	async updateAnswer(id: string, answer: string) {
		try {
			await this.questionDataBase.updateAnswer(id, answer)
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

	async getSummaryByTransId(transId: string) {
		try {
			const summary = await this.questionDataBase.getSummaryByTransId(transId)
			return summary
		} catch (error) {
			throw new Error('summary/get-failed')
		}
	}
}
