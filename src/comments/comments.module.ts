import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { commentsController } from './comments.controller';
import { CommentSchema } from './comments.schema';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Comments',
        schema: CommentSchema,
      },
    ]),
  ],
  providers: [CommentsService],
  controllers: [commentsController],
  exports: [CommentsService],
})
export class CommentModule {}
