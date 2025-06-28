// backend/projects/dto/create-project.dto.ts
// export class CreateProjectDto {
import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  valuation: number;

  @IsNumber()
  total_tokens: number;
}


