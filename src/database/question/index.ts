import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class QuestionDataBase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createQuestion(id: string, transId: string, question: string, answer?: string) {
		return this.prisma.$transaction(async (prisma) => {
			const { userId } = await prisma.transcription.findUnique({
				where: {
					id: transId
				},
				select: {
					userId: true
				}
			})

			if (!userId) {
				throw new Error('userId/get-failed')
			}

			const user = await prisma.user.findUnique({
				where: {
					id: userId
				},
				select: {
					id: true,
					credits: true
				}
			})

			if (!user) {
				throw new Error('user/get-failed')
			}

			if (user.credits === 0) {
				throw new Error('user/credits-insufficient')
			}

			await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					credits: --user.credits
				}
			})

			await prisma.question.create({
				data: {
					id,
					transId,
					question,
					answer
				}
			})
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
