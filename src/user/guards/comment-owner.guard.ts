import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();

    const currentComment = await this.commentRepo.findOne({
      select: { owner_: { id: true } },
      where: { id: params.commentId },
      relations: { owner_: true },
    });
    if (user.id !== currentComment.owner_.id) return false;
    return true;
  }
}
