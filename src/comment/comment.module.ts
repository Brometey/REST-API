import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CardEntity } from 'src/card/entities/card.entity';
import { CardModule } from 'src/card/card.module';
import { CommentRepository } from 'src/repositories/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CardEntity, CommentRepository]),
    CardModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
