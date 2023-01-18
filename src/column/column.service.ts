import { Injectable } from '@nestjs/common';
import { ColumnRepository } from 'src/repositories/column.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {}
  async create(createColumnDto: CreateColumnDto, user: UserEntity) {
    return this.columnRepository.create(createColumnDto, user.id);
  }

  async findAll() {
    return await this.columnRepository.find();
  }

  async findOne(id: number) {
    return await this.columnRepository.findOne(id);
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    return await this.columnRepository.update(id, updateColumnDto);
  }

  async remove(id: number) {
    return await this.columnRepository.delete(id);
  }
}
