import { Injectable, Inject } from '@nestjs/common'
import { Tier } from './entities'
import { getAuth } from 'firebase-admin/auth'
import { IdentityRepository } from './identity.repository'

@Injectable()
export class IdentityService {
	constructor(
		@Inject(IdentityRepository) protected identityRepository: IdentityRepository
	) {}

	async register(user: { email: string; password: string }) {
		const account = await getAuth().createUser({
			email: user.email,
			emailVerified: true,
			password: user.password,
			displayName: user.email
		})
		await this.identityRepository.createUser(account.uid, user.email)
	}

	async createAccountByLoginWithGoogle(email: string) {
		const user = await this.identityRepository.getUserByEmail(email)
		if (!user) {
			const accountInfo = await getAuth().getUserByEmail(email)
			await this.identityRepository.createUser(accountInfo.uid, email)
		}
	}

	async getUserByEmail(email: string) {
		return await this.identityRepository.getUserByEmail(email)
	}

	async getUserById(id: string) {
		return await this.identityRepository.getUserById(id)
	}

	async updateTier(userId: string, tier: Tier) {
		await this.identityRepository.updateUserTier(userId, tier)
	}

	async updateCredits(userId: string, credits: number) {
		await this.identityRepository.updateUserCredits(userId, credits)
	}

	async deleteUser(userId: string) {
		await this.identityRepository.deleteUser(userId)
	}
}
