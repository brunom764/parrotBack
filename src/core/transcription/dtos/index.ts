import { IsString, IsNumber, Length, IsArray } from 'class-validator';

export class TranscriptionDto {
  @IsNumber({}, { message: 'confidence must be a number' })
  confidence: number;

  @IsNumber({}, { message: 'end must be a number' })
  end: number;

  @IsString({ message: 'speaker must be a string' })
  speaker: string;

  @IsNumber({}, { message: 'start must be a number' })
  start: number;

  @IsString({ message: 'text must be a string' })
  text: string;
}
