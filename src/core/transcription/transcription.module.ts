import { Module } from '@nestjs/common'
import { TranscriptionController } from './transcription.controller'
import { TranscriptionService } from './transcription.service'
import { PrismaService } from 'src/services/prisma.service'
import { TranscriptionDatabase } from 'src/database/transcription'

@Module({
	controllers: [TranscriptionController],
	providers: [TranscriptionService, PrismaService, TranscriptionDatabase]
})
export class TranscriptionModule {}
