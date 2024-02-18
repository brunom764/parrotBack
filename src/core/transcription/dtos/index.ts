import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTranscriptionDto {
	@ApiProperty({ description: 'The transcription title' })
	@IsString({ message: 'name must be a string' })
	name: string
}
