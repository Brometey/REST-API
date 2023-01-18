import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { UpdateColumnDto } from 'src/column/dto/update-column.dto';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm';

export class ColumnRepository {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(createColumnDto: CreateCardDto, userId: number) {
    const newColumn = new ColumnEntity();
    Object.assign(newColumn, createColumnDto, { owner_: userId });
    return await this.columnRepository.save(newColumn);
  }
  async find() {
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

  async delete(id: number) {
    return await this.columnRepository.delete({ id: id });
  }
}
