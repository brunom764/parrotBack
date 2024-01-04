import { Injectable } from '@nestjs/common'
import fs from 'fs-extra'
import { IResponseData, ITranscript } from './assembly.interface'

@Injectable()
export class AssemblyService {
	api_token: string = process.env.ASSEMBLY_API_TOKEN

	// Function to upload a local file to the AssemblyAI API
	async upload_file(path: string): Promise<string | null> {
		const data = fs.readFileSync(path)
		const url = 'https://api.assemblyai.com/v2/upload'

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'application/octet-stream',
					Authorization: this.api_token
				}
			})

			if (response.status === 200) {
				const responseData = await response.json()
				return responseData['upload_url']
			} else {
				console.error(`Error: ${response.status} - ${response.statusText}`)
				return null
			}
		} catch (error) {
			console.error(`Error: ${error}`)
			return null
		}
	}

	// Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
	async transcribeAudio(audio_url: string) {
		const headers = {
			authorization: this.api_token,
			'content-type': 'application/json'
		}

		// Send a POST request to the transcription API with the audio URL in the request body
		const responsePost = await fetch('https://api.assemblyai.com/v2/transcript', {
			method: 'POST',
			body: JSON.stringify({ audio_url, speaker_labels: true, language_code: 'pt' }),
			headers
		})

		if (!responsePost.ok) {
			console.error(`Error: ${responsePost.status} - ${responsePost.statusText}`)
			return
		}

		// Retrieve the ID of the transcript from the response data
		const responseData = (await responsePost.json()) as IResponseData
		const transcriptId = responseData.id

		// Construct the polling endpoint URL using the transcript ID
		const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`

		// Poll the transcription API until the transcript is ready
		while (true) {
			// Send a GET request to the polling endpoint to retrieve the status of the transcript
			const responseGet = await fetch(pollingEndpoint, { headers })

			if (!responseGet.ok) {
				console.error(`Error: ${responseGet.status} - ${responseGet.statusText}`)
				return
			}

			const pollingData = (await responseGet.json()) as ITranscript
			if (pollingData.status === 'completed') {
				return pollingData
			}

			// Wait for a bit before polling again
			await new Promise((resolve) => setTimeout(resolve, 1000))
		}
	}
}
