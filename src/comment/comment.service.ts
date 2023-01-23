import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { CommentRepository } from 'src/repositories/comment.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    cardId: number,
    user: UserEntity,
  ) {
    return await this.commentRepository.create(
      createCommentDto,
      cardId,
      user.id,
    );
  }

  async findAll(cardId: number) {
    return await this.commentRepository.find(cardId);
  }

  async findOne(id: number, cardId: number) {
    return await this.commentRepository.findOne(id, cardId);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, cardId: number) {
    return await this.commentRepository.update(id, updateCommentDto, cardId);
  }
  async remove(id: number, cardId: number) {
    return await this.commentRepository.delete(id, cardId);
  }
}
