import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  overview?: string;

  @IsString()
  @IsOptional()
  done?: boolean;
}
