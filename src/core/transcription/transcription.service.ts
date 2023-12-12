import { Injectable} from '@nestjs/common'
import { TranscriptionDto } from './dtos'
import { AssemblyService } from 'src/services/assemblyworker/assembly.service'

@Injectable()
export class TranscriptionService {
    constructor(private readonly assemblyService: AssemblyService) {}

    async createTranscription(fileUrl: string, api_token: string){
        try {
            const audioUrl = await this.assemblyService.upload_file(api_token, fileUrl);

            if (audioUrl) {
                return await this.assemblyService.transcribeAudio(api_token, fileUrl);

                //console.log('Transcription Result:', transcriptionResult);
            } else {
                throw new Error('transcription/upload-failed')
            }
        } catch (error) {
            throw new Error('transcription/create-failed')
        }
    }

    // private async uploadAudioFile(api_token: string, audioFile: string): Promise<string | null> {
    //     try {            
    //         const fileUrl = await this.assemblyService.upload_file(api_token, audioFile);
    //         if (fileUrl) {
    //             return fileUrl;
    //         } else {
    //             throw new Error('transcription/upload-failed')
    //         }
    //     } catch (error) {
    //         throw new Error('transcription/upload-failed')
    //     }
    // }
}
