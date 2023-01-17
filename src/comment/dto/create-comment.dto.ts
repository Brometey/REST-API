import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Название комментария',
    example: 'Молочные изделия',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
