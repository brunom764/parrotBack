import { Module } from '@nestjs/common'
import { OpenaiModule } from 'src/services/openai/openai.module'
import { SummaryService } from './summary.service'
import { SummaryRepository } from './summary.repository'
import { SummaryController } from './summary.controller'

@Module({
	imports: [OpenaiModule],
	controllers: [SummaryController],
	providers: [SummaryService, SummaryRepository],
	exports: [SummaryService]
})
export class SummaryModule {}
