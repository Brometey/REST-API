import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CommentOwnerGuard } from 'src/user/guards/comment-owner.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создать комментарий к данной карте' })
  @ApiBody({
    schema: {
      properties: {
        title: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('cardId', ParseIntPipe)
    cardId: number,
    @UserDecorator() user: UserEntity,
  ) {
    return this.commentService.create(createCommentDto, cardId, user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить все комментарии карты' })
  @ApiResponse({
    status: 200,
    description: 'successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Get()
  async findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentService.findAll(cardId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить комментарий карты по ID' })
  @ApiResponse({
    status: 200,
    description: 'successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Get(':commentId')
  async findOne(
    @Param('commentId', ParseIntPipe) id: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return this.commentService.findOne(id, cardId);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, CommentOwnerGuard)
  @ApiOperation({ summary: 'Изменить комментарий карты по ID' })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Patch(':commentId')
  async update(
    @Param('commentId', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return this.commentService.update(id, updateCommentDto, cardId);
  }

  @UseGuards(AuthGuard, CommentOwnerGuard)
  @ApiOperation({ summary: 'Удалить комментарий карты по ID' })
  @ApiResponse({
    status: 200,
    description: 'deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Delete(':commentId')
  async remove(
    @Param('commentId', ParseIntPipe) id: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return this.commentService.remove(id, cardId);
  }
}
