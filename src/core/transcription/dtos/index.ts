import { IsString } from 'class-validator'

export class CreateTranscriptionDto {
	@IsString({ message: 'name must be a string' })
	name: string
}
