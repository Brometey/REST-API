import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnEntity } from './entities/column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnRepository } from 'src/repositories/column.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, ColumnRepository])],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
})
export class ColumnModule {}
