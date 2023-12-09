import { Tier } from '@core/identity/entities'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class IdentityDatabase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createUser(id: string, email: string, password: string) {
		await this.prisma.user.create({
			data: {
				id,
				email,
				password
			}
		})
	}

	async getUserByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getUserById(id: string) {
		return await this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async updateUserTier(id: string, tier: Tier) {
		await this.prisma.user.update({
			where: {
				id
			},
			data: {
				tier: tier
			}
		})
	}

	async updateUserCredits(id: string, credits: number) {
		await this.prisma.user.update({
			where: {
				id
			},
			data: {
				credits: credits
			}
		})
	}

	async deleteUser(id: string) {
		await this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
