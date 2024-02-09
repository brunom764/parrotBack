import { Module } from '@nestjs/common'
import { TranscriptionController } from './transcription.controller'
import { TranscriptionService } from './transcription.service'
import { AssemblyModule } from 'src/services/assemblyworker/assembly.module'
import { TranscriptionRepository } from './transcription.repository'

@Module({
	imports: [AssemblyModule],
	controllers: [TranscriptionController],
	providers: [TranscriptionService, TranscriptionRepository]
})
export class TranscriptionModule {}
