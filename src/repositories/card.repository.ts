import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { UpdateCardDto } from 'src/card/dto/update-card.dto';
import { CardEntity } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';

export class CardRepository {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepo: Repository<CardEntity>,
  ) {}
  async createCard(
    createCardDto: CreateCardDto,
    columnId: number,
    userId: number,
  ) {
    const newCard = new CardEntity();

    Object.assign(newCard, createCardDto, {
      column_: columnId,
      owner_: userId,
    });

    return await this.cardRepo.save(newCard);
  }

  async findAll(columnId: number) {
    return await this.cardRepo.find({
      where: { column_: { id: columnId } },
    });
  }

  async findOne(id: number, columnId: number) {
    return await this.cardRepo.findOneBy({
      id: id,
      column_: { id: columnId },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto, columnId: number) {
    return await this.cardRepo.update(
      { id: id, column_: { id: columnId } },
      { title: updateCardDto.title },
    );
  }

  async delete(id: number, columnId: number) {
    return await this.cardRepo.delete({
      id: id,
      column_: { id: columnId },
    });
  }
}
