import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm';

export class CommentRepository {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    cardId: number,
    userId: number,
  ) {
    const currentCard = await this.cardRepository.findOneBy({
      id: cardId,
    });
    if (!currentCard) throw new NotFoundException('Такой карты не существует');

    const newComment = new CommentEntity();
    Object.assign(newComment, createCommentDto, {
      owner_: userId,
      card_: cardId,
    });
    return await this.commentRepository.save(newComment);
  }

  async find(id: number) {
    return await this.commentRepository.find({
      where: { card_: { id: id } },
    });
  }

  async findOne(id: number, cardId: number) {
    return await this.commentRepository.findOneBy({
      id: id,
      card_: { id: cardId },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, cardId: number) {
    return await this.commentRepository.update(
      { id: id, card_: { id: cardId } },
      { title: updateCommentDto.title },
    );
  }

  async delete(id: number, cardId: number) {
    return await this.commentRepository.delete({
      id: id,
      card_: { id: cardId },
    });
  }
}
