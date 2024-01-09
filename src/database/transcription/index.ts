import { TranscriptText } from '@core/transcription/entities'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class TranscriptionDatabase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createTranscription(
		id: string,
		userId: string,
		name: string,
		duration?: number,
		text?: TranscriptText[]
	) {
		return await this.prisma.transcription.create({
			data: {
				id,
				userId,
				name,
				duration,
				text
			}
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

	async createSummary(id: string, summary: string) {
		return await this.prisma.transcription.update({
			where: {
				id
			},
			data: {
				summary
			}
		})
	}

	async getTranscriptionById(id: string) {
		return await this.prisma.transcription.findUnique({
			where: {
				id
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

	async getSummaryById(id: string) {
		return await this.prisma.transcription.findMany({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				summary: true,
				questions: true,
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
