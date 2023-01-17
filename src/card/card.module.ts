import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardEntity } from './entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity]), ColumnModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
