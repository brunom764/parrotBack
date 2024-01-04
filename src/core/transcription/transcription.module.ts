import { Module } from '@nestjs/common'
import { TranscriptionController } from './transcription.controller'
import { TranscriptionService } from './transcription.service'
import { PrismaService } from 'src/services/prisma.service'
import { TranscriptionDatabase } from 'src/database/transcription'
import { AssemblyModule } from 'src/services/assemblyworker/assembly.module'

@Module({
	imports: [AssemblyModule],
	controllers: [TranscriptionController],
	providers: [TranscriptionService, PrismaService, TranscriptionDatabase]
})
export class TranscriptionModule {}
