import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { CardOwnerGuard } from 'src/user/guards/card-owner.guard';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создать карту в данной колонке' })
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
    @Body() createCardDto: CreateCardDto,
    @Param('columnId') columnId: string,
    @UserDecorator() user: UserEntity,
  ) {
    return await this.cardService.create(createCardDto, +columnId, user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить все карты колонки' })
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
  findAll(@Param('columnId') columnId: string) {
    return this.cardService.findAll(+columnId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить карту колонки по ID' })
  @ApiResponse({
    status: 200,
    description: 'successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Get(':cardId')
  async findOne(
    @Param('cardId') id: string,
    @Param('columnId') columnId: string,
  ) {
    return await this.cardService.findOne(+id, +columnId);
  }

  @UseGuards(AuthGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'Изменить карту колонки' })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Patch(':cardId')
  update(
    @Param('cardId') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Param('columnId') columnId: string,
  ) {
    return this.cardService.update(+id, updateCardDto, +columnId);
  }

  @UseGuards(AuthGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'Удалить карту колонки' })
  @ApiResponse({
    status: 200,
    description: 'deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Delete(':cardId')
  remove(@Param('cardId') id: string, @Param('columnId') columnId: string) {
    return this.cardService.remove(+id, +columnId);
  }
}