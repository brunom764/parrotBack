import { Injectable, Inject } from '@nestjs/common'
import { IdentityDatabase } from 'src/database/identity'
import { Tier } from './entities'
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class IdentityService {
	constructor(@Inject(IdentityDatabase) protected identityDatabase: IdentityDatabase) {}

	async register(user: { email: string; password: string }) {
		try {
			const account = await getAuth().createUser({
				email: user.email,
				emailVerified: true,
				password: user.password,
				displayName: user.email
			})
			await this.identityDatabase.createUser(account.uid, user.email, user.password)
		} catch (error) {
			throw new Error('user-register/failed')
		}
	}

	async createAccountByLoginWithGoogle(email: string) {
		try {
			const user = await this.identityDatabase.getUserByEmail(email)
			if (!user) {
				const accountInfo = await getAuth().getUserByEmail(email)
				await this.identityDatabase.createUser(
					accountInfo.uid,
					email,
					'accountInfo.passwordHash'
				)
			}
		} catch (error) {
			throw new Error('user-verify-exists/failed')
		}
	}

	async getUserByEmail(email: string) {
		try {
			return await this.identityDatabase.getUserByEmail(email)
		} catch (error) {
			throw new Error('user-get-by-email/failed')
		}
	}

	async getUserById(id: string) {
		try {
			return await this.identityDatabase.getUserById(id)
		} catch (error) {
			throw new Error('user-get-by-id/failed')
		}
	}
	async updateTier(userId: string, tier: Tier) {
		try {
			await this.identityDatabase.updateUserTier(userId, tier)
		} catch (error) {
			throw new Error('user-update/failed')
		}
	}

	async updateCredits(userId: string, credits: number) {
		try {
			await this.identityDatabase.updateUserCredits(userId, credits)
		} catch (error) {
			throw new Error('user-update-credits/failed')
		}
	}

	async deleteUser(userId: string) {
		try {
			await this.identityDatabase.deleteUser(userId)
		} catch (error) {
			throw new Error('user-delete/failed')
		}
	}
}
