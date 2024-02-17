import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseService } from '../../../../src/services/firebase/firebase.service'
import { IdentityService } from '../identity.service'
import { IdentityRepository } from '../identity.repository'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { Tier } from '../entities'

jest.mock('../identity.repository')
jest.mock('../../../../src/services/firebase/firebase.service')

const user = { email: 'test@test.com', password: 'password' }
const email = 'test@test.com'
const account: UserRecord = {
	uid: '1',
	email: user.email,
	emailVerified: false,
	disabled: false,
	metadata: {
		creationTime: '',
		lastSignInTime: '',
		toJSON: function (): object {
			throw new Error('Function not implemented.')
		}
	},
	providerData: [],
	toJSON: () => ({})
}
const userFound = {
	id: '1',
	email: email,
	tier: Tier.FREE,
	credits: 0,
	createdAt: new Date(),
	updatedAt: new Date()
}

describe('IdentityService', () => {
	let service: IdentityService
	let repo: IdentityRepository
	let firebaseService: FirebaseService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [IdentityService, IdentityRepository, FirebaseService]
		}).compile()

		service = module.get<IdentityService>(IdentityService)
		repo = module.get<IdentityRepository>(IdentityRepository)
		firebaseService = module.get<FirebaseService>(FirebaseService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should register a user', async () => {
		jest.spyOn(firebaseService, 'createUser').mockResolvedValue(account)
		jest.spyOn(repo, 'createUser').mockResolvedValue(undefined)

		await service.register(user)

		expect(firebaseService.createUser).toHaveBeenCalledWith(user)
		expect(repo.createUser).toHaveBeenCalledWith(account.uid, user.email)
	})

	it('should create account by login with Google', async () => {
		jest.spyOn(repo, 'getUserByEmail').mockResolvedValueOnce(null)
		jest.spyOn(firebaseService, 'getUserByEmail').mockResolvedValue(account)
		jest.spyOn(repo, 'createUser').mockResolvedValue(undefined)

		await service.createAccountByLoginWithGoogle(email)

		expect(repo.getUserByEmail).toHaveBeenCalledWith(email)
		expect(firebaseService.getUserByEmail).toHaveBeenCalledWith(email)
		expect(repo.createUser).toHaveBeenCalledWith(account.uid, email)
	})

	it('should not create account if user already exists', async () => {
		jest.spyOn(repo, 'getUserByEmail').mockResolvedValueOnce(userFound)

		await service.createAccountByLoginWithGoogle(email)

		expect(repo.getUserByEmail).toHaveBeenCalledWith(email)
		expect(firebaseService.getUserByEmail).not.toHaveBeenCalled()
		expect(repo.createUser).not.toHaveBeenCalled()
	})

	it('should get user by email', async () => {
		jest.spyOn(repo, 'getUserByEmail').mockResolvedValue(userFound)

		await service.getUserByEmail(email)

		expect(repo.getUserByEmail).toHaveBeenCalledWith(email)
	})

	it('should get user by id', async () => {
		const id = '1'

		jest.spyOn(repo, 'getUserById').mockResolvedValue(userFound)

		await service.getUserById(id)

		expect(repo.getUserById).toHaveBeenCalledWith(id)
	})

	it('should update user tier', async () => {
		const userId = '1'
		const tier = Tier.BASIC

		jest.spyOn(repo, 'updateUserTier').mockResolvedValue(undefined)

		await service.updateTier(userId, tier)

		expect(repo.updateUserTier).toHaveBeenCalledWith(userId, tier)
	})

	it('should update user credits', async () => {
		const userId = '1'
		const credits = 100

		jest.spyOn(repo, 'updateUserCredits').mockResolvedValue(undefined)

		await service.updateCredits(userId, credits)

		expect(repo.updateUserCredits).toHaveBeenCalledWith(userId, credits)
	})

	it('should delete user', async () => {
		const userId = '1'

		jest.spyOn(repo, 'deleteUser').mockResolvedValue(undefined)
		jest.spyOn(firebaseService, 'deleteUser').mockResolvedValue(undefined)

		await service.deleteUser(userId)

		expect(repo.deleteUser).toHaveBeenCalledWith(userId)
		expect(firebaseService.deleteUser).toHaveBeenCalledWith(userId)
	})

	it('should add monthly bonus', async () => {
		jest.spyOn(repo, 'addMonthlyBonus').mockResolvedValue()

		await service.addMonthlyBonus()

		expect(repo.addMonthlyBonus).toHaveBeenCalled()
	})
})
