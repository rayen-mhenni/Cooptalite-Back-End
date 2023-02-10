import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Comments, CommentDocument } from './comments.schema';
import { comment } from 'src/actualite/dtos/actualiteDTO';
import * as moment from 'moment';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments')
    private readonly CommentModule: Model<CommentDocument>,
  ) {}

  async addComment(comment: comment): Promise<any> {
    const newRole = await this.CommentModule.create({
      ...comment,
      data: moment().format('MMMM Do, YYYY, hh:mm a'),
    });
    return newRole.save();
  }

  async updateComment(id: string, comment: comment): Promise<any> {
    const Comments = await this.CommentModule.findById(id);

    if (Comments) {
      await this.CommentModule.findByIdAndUpdate(Comments._id, {
        comment: comment.comment || Comments.comment,
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        listReply: comment.listReply || Comments.listReply,
        userId: comment.userId || Comments.userId,
      });

      return Comments;
    } else {
      throw new HttpException('Comments Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateCommentListReplay(id: string, idreplay: string): Promise<any> {
    const Comments = await this.CommentModule.findById(id);

    if (Comments) {
      await this.CommentModule.findByIdAndUpdate(Comments._id, {
        listReply: [...Comments.listReply, idreplay],
      });

      return Comments;
    } else {
      throw new HttpException('Comments Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteComment(id: string): Promise<any> {
    const Comments = await this.CommentModule.findOneAndDelete({ _id: id });
    if (!Comments) {
      throw new HttpException('Comments Not Found', HttpStatus.NOT_FOUND);
    } else {
      return Comments;
    }
  }

  async findComment(): Promise<Comments[] | undefined> {
    const Comments = await this.CommentModule.find();
    {
    }
    if (!Comments) {
      throw new HttpException('No Comments is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Comments;
    }
  }
}
