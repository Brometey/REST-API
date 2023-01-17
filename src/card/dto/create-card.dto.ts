import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Название карты',
    example: 'Молочные изделия',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
