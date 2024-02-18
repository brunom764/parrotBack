import { TranscriptText } from '@core/transcription/entities'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma/prisma.service'

@Injectable()
export class TranscriptionRepository {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createTranscription(
		id: string,
		userId: string,
		name: string,
		duration?: number,
		text?: TranscriptText[]
	) {
		return this.prisma.$transaction(async (prisma) => {
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

			const transcriptionCreditCount = Math.ceil((duration * 10) / 60)
			if (user.credits === 0 || user.credits < transcriptionCreditCount) {
				throw new Error('user/credits-insufficient')
			}

			await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					credits: user.credits - transcriptionCreditCount
				}
			})

			await prisma.transcription.create({
				data: {
					id,
					userId,
					name,
					duration,
					text
				}
			})
		})
	}

	async updateTranscription(id: string, transcript: TranscriptText[]) {
		return await this.prisma.transcription.update({
			where: {
				id
			},
			data: {
				text: transcript
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

	async getTranscriptionsByUserId(userId: string) {
		return await this.prisma.transcription.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				name: true,
				duration: true,
				createdAt: true
			}
		})
	}

	async deleteTranscription(id: string) {
		return await this.prisma.transcription.delete({
			where: {
				id
			}
		})
	}
}
