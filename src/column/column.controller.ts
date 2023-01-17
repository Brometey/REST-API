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
import { ColumnOwnerGuard } from 'src/user/guards/column-owner.guard';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создать колонку' })
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
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() createColumnDto: CreateColumnDto,
    @UserDecorator() user: UserEntity,
  ) {
    return await this.columnService.create(createColumnDto, user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить все колонки' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.columnService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Get(':columnId')
  async findOne(@Param('columnId') id: string) {
    return this.columnService.findOne(+id);
  }

  @UseGuards(AuthGuard, ColumnOwnerGuard)
  @ApiOperation({ summary: 'изменить колонку' })
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
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Patch(':columnId')
  async update(
    @Param('columnId') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return await this.columnService.update(+id, updateColumnDto);
  }

  @UseGuards(AuthGuard, ColumnOwnerGuard)
  @ApiOperation({ summary: 'Удалить колонку' })
  @ApiResponse({
    status: 200,
    description: 'successfully deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @Delete(':columnId')
  async remove(@Param('columnId') id: string) {
    return await this.columnService.remove(+id);
  }
}
