import { Tier } from '@core/identity/entities'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class IdentityDatabase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createUser(id: string, email: string) {
		return await this.prisma.user.create({
			data: {
				id,
				email
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
		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				tier: tier
			}
		})
	}

	async updateUserCredits(id: string, credits: number) {
		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				credits: credits
			}
		})
	}

	async deleteUser(id: string) {
		return await this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
