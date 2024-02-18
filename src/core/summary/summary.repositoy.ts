import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma/prisma.service'

@Injectable()
export class SummaryRepository {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createSummary(id: string, summary: string) {
		return this.prisma.$transaction(async (prisma) => {
			const { userId } = await prisma.transcription.findUnique({
				where: {
					id: id
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

			return await this.prisma.transcription.update({
				where: {
					id
				},
				data: {
					summary
				},
				select: {
					id: true,
					name: true,
					summary: true
				}
			})
		})
	}

	async getSummaryById(id: string) {
		return await this.prisma.transcription.findMany({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				summary: true
			}
		})
	}

	async getTranscriptionById(id: string) {
		return await this.prisma.transcription.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				userId: true,
				name: true,
				duration: true,
				text: true,
				createdAt: true
			}
		})
	}

	async deleteSummary(id: string) {
		return await this.prisma.transcription.update({
			where: {
				id
			},
			data: {
				summary: ''
			}
		})
	}
}
