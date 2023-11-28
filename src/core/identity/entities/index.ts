export enum Tier {
	FREE = 'FREE',
	PREMIUM = 'PREMIUM'
}

export interface IUser {
	id: string
	email: string
	password: string
	tier: Tier
	credits: number
	createdAt: Date
	UpdatedAt: Date
}

export class User {
	id: string
	email: string
	password: string
	tier: Tier | string
	credits: number
	createdAt?: Date
	UpdatedAt?: Date
	constructor(user: IUser) {
		this.id = user.id
		this.email = user.email
		this.password = user.password
		this.tier = user.tier
		this.credits = user.credits
		this.createdAt = new Date()
		this.UpdatedAt = new Date()
	}
}
