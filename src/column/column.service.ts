import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}
  async create(createColumnDto: CreateColumnDto, user: UserEntity) {
    const newColumn = new ColumnEntity();
    Object.assign(newColumn, createColumnDto, { owner_: user.id });
    return await this.columnRepository.save(newColumn);
  }

  async findAll() {
    return await this.columnRepository.find();
  }

  async findOne(id: number) {
    return await this.columnRepository.findOneBy({ id: id });
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    return await this.columnRepository.update(
      { id: id },
      { title: updateColumnDto.title },
    );
  }

  async remove(id: number) {
    return await this.columnRepository.delete({ id: id });
  }
}
