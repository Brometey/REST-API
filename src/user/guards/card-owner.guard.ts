import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(CardEntity)
    private readonly cardRepo: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();

    const currentCard = await this.cardRepo.findOne({
      select: { owner_: { id: true } },
      where: { id: params.cardId },
      relations: { owner_: true },
    });
    if (user.id !== currentCard.owner_.id) return false;
    return true;
  }
}
