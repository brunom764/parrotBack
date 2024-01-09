import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class QuestionDataBase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createQuestion(id: string, transId: string, question: string, answer?: string) {
		return await this.prisma.question.create({
			data: {
				id,
				transId,
				question,
				answer
			}
		})
	}

	async updateAnswer(id: string, answer: string) {
		return await this.prisma.question.update({
			where: {
				id
			},
			data: {
				answer
			}
		})
	}

	async getQuestionById(id: string) {
		return await this.prisma.question.findUnique({
			where: {
				id
			}
		})
	}

	async getQuestionsByTransId(transId: string) {
		return await this.prisma.question.findMany({
			where: {
				transId
			},
			select: {
				id: true,
				question: true,
				answer: true,
				createdAt: true
			}
		})
	}

	async deleteQuestion(id: string) {
		return await this.prisma.question.delete({
			where: {
				id
			}
		})
	}
}
