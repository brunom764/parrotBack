import { TestingModule, Test } from '@nestjs/testing'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'
import { TranscriptionRepository } from '../transcription.repository'
import { TranscriptionService } from '../transcription.service'
import { AssemblyModule } from 'src/services/assemblyworker/assembly.module'

jest.mock('../transcription.repository')
jest.mock('src/services/assemblyWorker/assembly.service')

const transId = '11'
const userId = '22'

describe('TranscriptionService', () => {
	let service: TranscriptionService
	let repo: TranscriptionRepository
	let assemblyService: AssemblyService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AssemblyModule],
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
		const audioUrl = 'https://example.com/audio'
		const audio_duration = 160
		const status = 'completed'
		const transcriptionText = [
			{
				confidence: 0.9,
				end: 50,
				speaker: 'A',
				start: 40,
				text: 'transcriptiontranscriptiontranscription'
			}
		]

		const iTranscript = {
			id: transId,
			language_model: 'assemblyai_default',
			acoustic_model: 'assemblyai_default',
			language_code: 'pt',
			status: status,
			audio_url: 'https://cdn.assemblyai.com/upload/d6ba15e6-2b30-40c0-88c8-712e44f04b4e',
			text: 'This is a sample transcript.',
			words: [
				{
					text: 'Boa',
					start: 690,
					end: 810,
					confidence: 0.883,
					speaker: 'A'
				}
			],
			utterances: [
				{
					confidence: 0.9,
					end: 50,
					speaker: 'A',
					start: 40,
					text: 'transcriptiontranscriptiontranscription',
					words: []
				}
			],
			confidence: 0.85,
			audio_duration: 160,
			punctuate: true,
			format_text: true,
			dual_channel: false,
			webhook_url: null,
			webhook_status_code: null,
			webhook_auth: false,
			webhook_auth_header_name: null,
			speed_boost: false,
			auto_highlights_result: null,
			auto_highlights: false,
			audio_start_from: null,
			audio_end_at: null,
			word_boost: [],
			boost_param: null,
			filter_profanity: true,
			redact_pii: false,
			redact_pii_audio: false,
			redact_pii_audio_quality: null,
			redact_pii_policies: null,
			redact_pii_sub: null,
			speaker_labels: true,
			content_safety: false,
			iab_categories: false,
			content_safety_labels: { status: 'unavailable', results: [], summary: {} },
			iab_categories_result: { status: 'unavailable', results: [], summary: {} },
			language_detection: false,
			custom_spelling: null,
			throttled: null,
			auto_chapters: false,
			summarization: false,
			summary_type: null,
			summary_model: null,
			custom_topics: false,
			topics: [],
			speech_threshold: null,
			chapters: null,
			disfluencies: false,
			entity_detection: false,
			entities: null,
			speakers_expected: null,
			summary: null,
			sentiment_analysis: false,
			sentiment_analysis_results: null
		}

		jest.spyOn(assemblyService, 'upload_file').mockResolvedValue(audioUrl)
		jest.spyOn(assemblyService, 'transcribeAudio').mockResolvedValue(iTranscript)
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
