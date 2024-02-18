import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSummaryDto {
	@ApiProperty({ description: 'The transcription id' })
	@IsString({ message: 'transId must be a string' })
	transId: string
}
