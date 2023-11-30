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
import { UserDto } from './dtos'
import { Tier, User } from './entities'

@Controller('identity')
export class IdentityController {
	constructor(private readonly identityService: IdentityService) {}

	@HttpCode(201)
	@Post('create')
	async createClient(@Body() user: UserDto): Promise<void> {
		try {
			return await this.identityService.register(user)
		} catch (error) {
			throw new InternalServerErrorException('user/create-failed')
		}
	}

	@HttpCode(200)
	@Get('user-by-email/:email')
	async getUserByEmail(@Param('email') email: string): Promise<User> {
		try {
			return await this.identityService.getUserByEmail(email)
		} catch (error) {
			throw new InternalServerErrorException('user/get-by-email-failed')
		}
	}

	@HttpCode(200)
	@Get('user-by-id/:id')
	async getUserById(@Param('id') id: string): Promise<User> {
		try {
			return await this.identityService.getUserById(id)
		} catch (error) {
			throw new InternalServerErrorException('user/get-by-id-failed')
		}
	}

	@HttpCode(200)
	@Put('update-tier/:id')
	async updateTier(@Param('id') id: string, @Body() tier: Tier): Promise<void> {
		try {
			return await this.identityService.updateTier(id, tier)
		} catch (error) {
			throw new InternalServerErrorException('user/update-tier-failed')
		}
	}

	@HttpCode(200)
	@Put('update-credits/:id')
	async updateCredits(@Param('id') id: string, @Body() credits: number): Promise<void> {
		try {
			return await this.identityService.updateCredits(id, credits)
		} catch (error) {
			throw new InternalServerErrorException('user/update-credits-failed')
		}
	}

	@HttpCode(200)
	@Delete('delete/:id')
	async deleteUser(@Param('id') id: string): Promise<void> {
		try {
			return await this.identityService.deleteUser(id)
		} catch (error) {
			throw new InternalServerErrorException('user/delete-failed')
		}
	}
}
