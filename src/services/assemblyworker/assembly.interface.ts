/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseData {
	id: string
}

export interface Word {
	text: string
	start: number
	end: number
	confidence: number
	speaker: string
}

export interface Utterance {
	confidence: number
	end: number
	speaker: string
	start: number
	text: string
	words: Word[]
}

export interface ContentSafetyLabels {
	status: string
	results: any[]
	summary: any
}

export interface IabCategoriesResult {
	status: string
	results: any[]
	summary: any
}

export interface ITranscript {
	id: string
	language_model: string
	acoustic_model: string
	language_code: string
	status: string
	audio_url: string
	text: string
	words: Word[]
	utterances: Utterance[]
	confidence: number
	audio_duration: number
	punctuate: boolean
	format_text: boolean
	dual_channel: boolean
	webhook_url: null | string
	webhook_status_code: null | number
	webhook_auth: boolean
	webhook_auth_header_name: null | string
	speed_boost: boolean
	auto_highlights_result: null | any
	auto_highlights: boolean
	audio_start_from: null | number
	audio_end_at: null | number
	word_boost: any[]
	boost_param: null | any
	filter_profanity: boolean
	redact_pii: boolean
	redact_pii_audio: boolean
	redact_pii_audio_quality: null | any
	redact_pii_policies: null | any
	redact_pii_sub: null | any
	speaker_labels: boolean
	content_safety: boolean
	iab_categories: boolean
	content_safety_labels: ContentSafetyLabels
	iab_categories_result: IabCategoriesResult
	language_detection: boolean
	custom_spelling: null | any
	throttled: null | any
	auto_chapters: boolean
	summarization: boolean
	summary_type: null | any
	summary_model: null | any
	custom_topics: boolean
	topics: any[]
	speech_threshold: null | any
	chapters: null | any
	disfluencies: boolean
	entity_detection: boolean
	entities: null | any
	speakers_expected: null | any
	summary: null | any
	sentiment_analysis: boolean
	sentiment_analysis_results: null | any
}
