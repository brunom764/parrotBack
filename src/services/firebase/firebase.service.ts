import { Inject, Injectable } from '@nestjs/common'
import { app } from 'firebase-admin'

@Injectable()
export class FirebaseService {
	private readonly auth = this.firebaseApp.auth()

	constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
		this.auth = firebaseApp.auth()
	}

	async createUser(data: { email: string; password: string }) {
		const user = await this.auth.createUser({
			email: data.email,
			password: data.password,
			displayName: data.email.split('@')[0],
			emailVerified: true
		})

		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.auth.getUserByEmail(email)
		return user
	}

	async deleteUser(uid: string) {
		await this.auth.deleteUser(uid)
	}
}
