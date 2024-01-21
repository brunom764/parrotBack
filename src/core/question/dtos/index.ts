import { IsString, Length } from 'class-validator'

export class QuestionDto {
	@IsString({ message: 'transId must be a string' })
	transId: string

	@Length(15, 140, { message: 'question must be between 15 and 140 characters' })
	@IsString({ message: 'question must be a string' })
	question: string
}
