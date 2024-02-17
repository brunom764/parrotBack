import {
	Controller,
	Post,
	HttpCode,
	Body,
	Put,
	InternalServerErrorException,
	Param,
	Delete,
	Get
} from '@nestjs/common'
import { IdentityService } from './identity.service'
import {
	LoginWithGoogleDto,
	UpdateUserTierDto,
	UserDto,
	UpdateUserCreditsDto
} from './dtos'
import { User } from './entities'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import {
	BAD_REQUEST_API_RESPONSE,
	CREATE_USER_API_RESPONSE,
	DELETE_USER_API_RESPONSE,
	EMAIL_PARAM,
	GET_USER_API_RESPONSE,
	INTERNAL_SERVER_ERROR_API_RESPONSE,
	MONTHLY_BONUS_API_RESPONSE,
	NOT_FOUND_API_RESPONSE,
	UPDATE_USER_API_RESPONSE,
	USER_ID_PARAM
} from '@core/common/docs/constants'
import { Cron } from '@nestjs/schedule'

@ApiResponse(INTERNAL_SERVER_ERROR_API_RESPONSE)
@ApiResponse(BAD_REQUEST_API_RESPONSE)
@Controller('identity')
export class IdentityController {
	constructor(private readonly identityService: IdentityService) {}

	@HttpCode(201)
	@ApiBody({ type: UserDto })
	@ApiResponse(CREATE_USER_API_RESPONSE)
	@Post('create')
	async create(@Body() user: UserDto): Promise<void> {
		try {
			return await this.identityService.register(user)
		} catch (error) {
			throw new InternalServerErrorException('user/create-failed')
		}
	}

	@HttpCode(200)
	@ApiBody({ type: LoginWithGoogleDto })
	@ApiResponse(CREATE_USER_API_RESPONSE)
	@Post('login-with-google')
	async loginWithGoogle(@Body() data: LoginWithGoogleDto): Promise<void> {
		try {
			return await this.identityService.createAccountByLoginWithGoogle(data.email)
		} catch (error) {
			throw new InternalServerErrorException('user/login-with-google-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(EMAIL_PARAM)
	@ApiResponse(GET_USER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('user-by-email/:email')
	async getUserByEmail(@Param('email') email: string): Promise<User> {
		try {
			return await this.identityService.getUserByEmail(email)
		} catch (error) {
			throw new InternalServerErrorException('user/get-by-email-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(USER_ID_PARAM)
	@ApiResponse(GET_USER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Get('user-by-id/:id')
	async getUserById(@Param('id') id: string): Promise<User> {
		try {
			return await this.identityService.getUserById(id)
		} catch (error) {
			throw new InternalServerErrorException('user/get-by-id-failed')
		}
	}

	@HttpCode(200)
	@ApiBody({ type: UpdateUserTierDto })
	@ApiParam(USER_ID_PARAM)
	@ApiResponse(UPDATE_USER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Put('update-tier/:id')
	async updateTier(
		@Param('id') id: string,
		@Body() data: UpdateUserTierDto
	): Promise<void> {
		try {
			return await this.identityService.updateTier(id, data.tier)
		} catch (error) {
			throw new InternalServerErrorException('user/update-tier-failed')
		}
	}

	@HttpCode(200)
	@ApiBody({ type: UpdateUserCreditsDto })
	@ApiParam(USER_ID_PARAM)
	@ApiResponse(UPDATE_USER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Put('update-credits/:id')
	async updateCredits(
		@Param('id') id: string,
		@Body() data: UpdateUserCreditsDto
	): Promise<void> {
		try {
			return await this.identityService.updateCredits(id, data.credits)
		} catch (error) {
			throw new InternalServerErrorException('user/update-credits-failed')
		}
	}

	@HttpCode(200)
	@ApiParam(USER_ID_PARAM)
	@ApiResponse(DELETE_USER_API_RESPONSE)
	@ApiResponse(NOT_FOUND_API_RESPONSE)
	@Delete('delete/:id')
	async deleteUser(@Param('id') id: string): Promise<void> {
		try {
			return await this.identityService.deleteUser(id)
		} catch (error) {
			throw new InternalServerErrorException('user/delete-failed')
		}
	}

	@Cron('0 0 6 1 * *', { timeZone: 'America/Sao_Paulo' })
	@ApiResponse(MONTHLY_BONUS_API_RESPONSE)
	async handleCron() {
		try {
			await this.identityService.addMonthlyBonus()
		} catch (error) {
			throw new InternalServerErrorException('user/add-monthly-bonus-failed')
		}
	}
}
