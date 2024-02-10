import { IsEmail, IsIn, IsInt, IsString, Length } from 'class-validator'
import { Tier } from '../entities'

export class UserDto {
	@Length(7, 50, { message: 'email must be between 7 and 50 characters' })
	@IsEmail({}, { message: 'email must be a valid email' })
	@IsString({ message: 'email must be a string' })
	email: string

	@Length(6, 30, { message: 'password must be between 6 and 30 characters' })
	@IsString({ message: 'password must be a string' })
	password: string
}

export class LoginWithGoogleDto {
	@IsEmail({}, { message: 'email must be a valid email' })
	@IsString({ message: 'email must be a string' })
	email: string
}

export class UpdateUserTierDto {
	@IsIn(['FREE', 'PREMIUM'] as Tier[], { message: 'tier must be a valid tier' })
	tier: Tier
}

export class UpdateUserCreditsDto {
	@IsInt({ message: 'credits must be a number' })
	credits: number
}
