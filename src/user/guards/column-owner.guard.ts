import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(ColumnEntity)
    private readonly columnRepo: Repository<ColumnEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();

    const currentColumn = await this.columnRepo.findOne({
      select: { owner_: { id: true } },
      where: { id: params.columnId },
      relations: { owner_: true },
    });
    if (user.id !== currentColumn.owner_.id) return false;
    return true;
  }
}
