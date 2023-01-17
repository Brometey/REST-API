import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './user/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CardModule,
    ColumnModule,
    CommentModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/register', method: RequestMethod.ALL },
        { path: '/user/login', method: RequestMethod.ALL },
        // { path: "/columns/**", method: RequestMethod.GET},
        // { path: "/cards/**", method: RequestMethod.GET}
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
