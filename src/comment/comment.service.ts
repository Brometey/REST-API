import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    cardId: number,
    user: UserEntity,
  ) {
    const currentCard = await this.cardRepository.findOneBy({
      id: cardId,
    });
    if (!currentCard) throw new NotFoundException('Такой карты не существует');
    const newComment = new CommentEntity();
    Object.assign(newComment, createCommentDto, {
      owner_: user.id,
      card_: cardId,
    });
    return await this.commentRepository.save(newComment);
  }

  async findAll(cardId: number) {
    return await this.commentRepository.find({
      where: { card_: { id: cardId } },
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

  async remove(id: number, cardId: number) {
    return await this.commentRepository.delete({
      id: id,
      card_: { id: cardId },
    });
  }
}
