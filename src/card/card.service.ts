import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { CardRepository } from 'src/repositories/card.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    private cardRepository: CardRepository,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}
  async create(
    createCardDto: CreateCardDto,
    columnId: number,
    user: UserEntity,
  ) {
    const currentColumn = await this.columnRepository.findOneBy({
      id: columnId,
    });

    if (!currentColumn)
      throw new NotFoundException('Такой колонки не существует');

    return await this.cardRepository.createCard(
      createCardDto,
      columnId,
      user.id,
    );
  }

  async findAll(columnId: number) {
    return await this.cardRepository.findAll(columnId);
  }

  async findOne(id: number, columnId: number) {
    const card = this.cardRepository.findOne(id, columnId);

    if (!card) throw new NotFoundException('Такой карты не существует');

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto, columnId: number) {
    return await this.cardRepository.update(id, updateCardDto, columnId);
  }

  async remove(id: number, columnId: number) {
    return await this.cardRepository.delete(id, columnId);
  }
}
