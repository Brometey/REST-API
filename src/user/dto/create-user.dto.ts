import { MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: 'email must be in right format' })
  @ApiProperty({
    description: 'email',
    example: 'random@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password must contain at least 8 characters' })
  @ApiProperty({
    description: 'password',
    example: 'somepass123',
  })
  readonly password: string;
}
