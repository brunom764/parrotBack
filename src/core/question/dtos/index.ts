import { IsString, IsOptional, Length } from 'class-validator'

export class QuestionDto {
	@Length(15, 140, {})
	@IsString({ message: 'id must be a string' })
	id: string

	@IsString({ message: 'transId must be a string' })
	transId: string

	@IsString({ message: 'question must be a string' })
	question: string

	@IsOptional()
	@IsString({ message: 'answer must be a string' })
	answer?: string
}
