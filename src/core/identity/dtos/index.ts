import { IsEmail, IsString, Length } from 'class-validator'

export class UserDto {
	@Length(7, 50, { message: 'email must be between 7 and 50 characters' })
	@IsEmail({}, { message: 'email must be a valid email' })
	@IsString({ message: 'email must be a string' })
	email: string

	@Length(6, 30, { message: 'password must be between 6 and 30 characters' })
	@IsString({ message: 'password must be a string' })
	password: string
}
