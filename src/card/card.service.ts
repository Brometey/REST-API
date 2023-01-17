import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
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
    const newCard = new CardEntity();
    Object.assign(newCard, createCardDto, {
      column_: columnId,
      owner_: user.id,
    });
    return await this.cardRepository.save(newCard);
  }

  async findAll(columnId: number) {
    return await this.cardRepository.find({
      where: { column_: { id: columnId } },
    });
  }

  async findOne(id: number, columnId: number) {
    const card = await this.cardRepository.findOneBy({
      id: id,
      column_: { id: columnId },
    });
    if (!card) throw new NotFoundException('Такой карты не существует');
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto, columnId: number) {
    return await this.cardRepository.update(
      { id: id, column_: { id: columnId } },
      { title: updateCardDto.title },
    );
  }

  async remove(id: number, columnId: number) {
    return await this.cardRepository.delete({
      id: id,
      column_: { id: columnId },
    });
  }
}
