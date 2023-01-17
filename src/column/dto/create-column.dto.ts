import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    description: 'Название колонки',
    example: 'Продукты',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
