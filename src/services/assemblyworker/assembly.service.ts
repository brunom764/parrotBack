import { Injectable} from '@nestjs/common'
import fs from 'fs-extra'
import axios from 'axios'

@Injectable()
export class AssemblyService{ 
        api_token: string = process.env.ASSEMBLY_API_TOKEN || '';

        // Function to upload a local file to the AssemblyAI API
        async upload_file(api_token: string, path: string): Promise<string | null> {
            const data = fs.readFileSync(path);
            const url = 'https://api.assemblyai.com/v2/upload';

            try {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Authorization': api_token,
                    },
                });

                if (response.status === 200) {
                    return response.data['upload_url'];
                } else {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                return null;
                }
            } catch (error) {
                console.error(`Error: ${error}`);
                return null;
            }
        }

        // Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
        async transcribeAudio(api_token: string, audio_url: string) {
            const headers = {
                authorization: api_token,
                'content-type': 'application/json',
        };

        // Send a POST request to the transcription API with the audio URL in the request body
        const response = await axios.post('https://api.assemblyai.com/v2/transcript', { audio_url, speaker_labels: true, language_code: 'pt' }, { headers });

        // Retrieve the ID of the transcript from the response data
        const transcriptId = response.data.id;

        // Construct the polling endpoint URL using the transcript ID
        const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

        // Poll the transcription API until the transcript is ready
        while (true) {
            // Send a GET request to the polling endpoint to retrieve the status of the transcript
            const pollingResponse = await axios.get(pollingEndpoint, { headers });

            // Retrieve the transcription result from the response data
            const transcriptionResult = pollingResponse.data;

            // If the transcription is complete, return the transcript object
            if (transcriptionResult.status === 'completed') {
                return transcriptionResult;
            }
            // If the transcription has failed, throw an error with the error message
            else if (transcriptionResult.status === 'error') {
                throw new Error(`Transcription failed: ${transcriptionResult.error}`);
            }
            // If the transcription is still in progress, wait for a few seconds before polling again
            else {
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }
}