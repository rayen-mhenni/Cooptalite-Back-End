import { Module } from '@nestjs/common';
import { ActualiteService } from './actualite.service';
import { ActualiteController } from './actualite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { actualiteSchema } from './actualite.schema';
import { CommentModule } from 'src/comments/comments.module';

@Module({
  imports: [
    CommentModule,
    MongooseModule.forFeature([
      {
        name: 'Actualite',
        schema: actualiteSchema,
      },
    ]),
  ],
  providers: [ActualiteService],
  controllers: [ActualiteController],
  exports: [ActualiteService],
})
export class ActualiteModule {}
