import { TestingModule, Test } from '@nestjs/testing'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'
import { TranscriptionRepository } from '../transcription.repository'
import { TranscriptionService } from '../transcription.service'

jest.mock('../transcription.repository')
jest.mock('src/services/assemblyWorker/assembly.service.ts')

const transId = '11'
const userId = '22'

describe('QuestionService', () => {
	let service: TranscriptionService
	let repo: TranscriptionRepository
	let assemblyService: AssemblyService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TranscriptionService, TranscriptionRepository]
		}).compile()

		service = module.get<TranscriptionService>(TranscriptionService)
		repo = module.get<TranscriptionRepository>(TranscriptionRepository)
		assemblyService = module.get<AssemblyService>(AssemblyService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a transcription', async () => {
		const userId = '1'
		const fileUrl = './path/to/file.mp3'
		const name = 'transcriptionName'
		const audioUrl =
			'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'
		const transId = '11'
		const audio_duration = 160
		const transcriptionText = {
			confidence: 0.9,
			end: 50,
			speaker: 'A',
			start: 40,
			text: 'transcriptiontranscriptiontranscription'
		}
		jest.spyOn(assemblyService, 'upload_file').mockResolvedValue(undefined)
		jest.spyOn(assemblyService, 'transcribeAudio').mockResolvedValue(undefined)
		jest.spyOn(repo, 'createTranscription').mockResolvedValue(undefined)

		await service.createTranscription(fileUrl, userId, name)

		expect(assemblyService.upload_file).toHaveBeenCalledWith(fileUrl)
		expect(assemblyService.transcribeAudio).toHaveBeenCalledWith(audioUrl)
		expect(repo.createTranscription).toHaveBeenCalledWith(
			transId,
			userId,
			name,
			audio_duration,
			transcriptionText
		)
	})

	it('should get transcription by id', async () => {
		const transcription = {
			userId: userId,
			text: [
				{
					confidence: '0',
					end: '0',
					speaker: 'A',
					start: '0',
					text: 'text'
				}
			],
			id: transId,
			name: 'nome',
			duration: 0,
			createdAt: new Date()
		}
		jest.spyOn(repo, 'getTranscriptionById').mockResolvedValue(transcription)

		await service.getTranscriptionById(transId)

		expect(repo.getTranscriptionById).toHaveBeenCalledWith(transId)
	})

	it('should get transcriptions by userId', async () => {
		const transcription = [
			{
				id: transId,
				name: 'nome',
				duration: 0,
				createdAt: new Date()
			}
		]
		jest.spyOn(repo, 'getTranscriptionsByUserId').mockResolvedValue(transcription)

		await service.getTranscriptionsByUserId(userId)

		expect(repo.getTranscriptionsByUserId).toHaveBeenCalledWith(userId)
	})

	it('should delete transcription', async () => {
		jest.spyOn(repo, 'deleteTranscription').mockResolvedValue(undefined)

		await service.deleteTranscription(transId)

		expect(repo.deleteTranscription).toHaveBeenCalledWith(transId)
	})
})
