import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './types/user-response.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiOperation({ summary: 'регистрация' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'email',
          example: 'John@gmail.com',
        },
        password: {
          type: 'string',
          description: 'password',
          example: '123456789',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'created succesfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          example: '42',
        },
        email: {
          type: 'string',
          description: 'email',
          example: 'John@gmail.com',
        },
        password: {
          type: 'string',
          description: 'password',
          example: '123456789',
        },
        token: {
          type: 'string',
          description: 'token',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheV9uYW1lIjoiTWVsbmlrIiwiZW1haWwiOiJtZWxuaWtAZ21haWwuY29tIiwiaWF0IjoxNjcxMTc1NzQ1fQ.Djj2kgoTg92XINATm3O_wotPTll99dSNoqhhQqZL3tM',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'email',
          example: 'John@gmail.com',
        },
        password: {
          type: 'string',
          description: 'password',
          example: '123456789',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'succesfully in',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          example: '42',
        },
        email: {
          type: 'string',
          description: 'email',
          example: 'John@gmail.com',
        },
        password: {
          type: 'string',
          description: 'password',
          example: '123456789',
        },
        token: {
          type: 'string',
          description: 'token',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheV9uYW1lIjoiTWVsbmlrIiwiZW1haWwiOiJtZWxuaWtAZ21haWwuY29tIiwiaWF0IjoxNjcxMTc1NzQ1fQ.Djj2kgoTg92XINATm3O_wotPTll99dSNoqhhQqZL3tM',
        },
      },
    },
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
