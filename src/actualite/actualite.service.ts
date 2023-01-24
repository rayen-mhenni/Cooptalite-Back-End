import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/user.schema';
import { actualite, actualiteDocument } from './actualite.schema';
import { actualiteDTO, comment } from './dtos/actualiteDTO';

@Injectable()
export class ActualiteService {
  constructor(
    @InjectModel('Actualite')
    private readonly actualiteModule: Model<actualiteDocument>,
    private readonly CommentsService: CommentsService,
  ) {}

  async addactualites(actualiteDTO: actualiteDTO): Promise<any> {
    const actualite = await this.actualiteModule.findOne({
      title: actualiteDTO.title,
    });

    if (!actualite) {
      const newActualite = await this.actualiteModule.create(actualiteDTO);
      return newActualite.save();
    } else {
      throw new HttpException(
        'Actualite already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async addComment(id: string, comment: comment): Promise<any> {
    const actualite = await this.actualiteModule.findById(id);

    if (actualite) {
      const newComment = await this.CommentsService.addComment(comment);
      const updateComments = actualite?.comments ?? [];
      updateComments.push(newComment._id);
      const newactualite = await this.actualiteModule.findByIdAndUpdate(id, {
        comments: updateComments,
      });

      return newactualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async replyComment(id: string, comment: comment): Promise<any> {
    const com = await this.CommentsService.addComment(comment);

    if (actualite) {
      const newComment = await this.CommentsService.updateCommentListReplay(
        id,
        com._id,
      );

      return newComment;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteComment(id: string, commentId: string): Promise<any> {
    const actualite = await this.actualiteModule.findById(id);

    if (actualite) {
      const newComment = await this.CommentsService.deleteComment(commentId);
      const updateComments =
        actualite?.comments.filter((com: any) => com !== commentId) ?? [];

      const newactualite = await this.actualiteModule.findByIdAndUpdate(id, {
        comments: updateComments,
      });

      return newactualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateactualites(id: string, actualiteDTO: actualiteDTO): Promise<any> {
    const actualite = await this.actualiteModule.findById(id);

    if (actualite) {
      await this.actualiteModule.findByIdAndUpdate(actualite._id, {
        imgUrl: actualiteDTO.imgUrl || actualite.imgUrl,
        title: actualiteDTO.title || actualite.title,
        tags: actualiteDTO.tags || actualite.tags,
        desc: actualiteDTO.desc || actualite.desc,
        favorite: actualiteDTO.favorite || actualite.favorite,
        status: actualiteDTO.status || actualite.status,
      });

      return actualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateFavorite(id: string, favorite: string[]): Promise<any> {
    if (actualite) {
      await this.actualiteModule.findByIdAndUpdate(id, {
        favorite: favorite,
      });

      return actualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findActualite(title: string): Promise<actualite | undefined> {
    const actualite = await this.actualiteModule.findOne({ title: title });

    if (!actualite) {
      throw new HttpException('Actualite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }

  async findActualiteById(id: string): Promise<actualite | undefined> {
    const actualite = await this.actualiteModule.findById(id).populate({
      path: 'comments',
      model: 'Comments',
      populate: [
        { path: 'userId', model: 'User', select: 'profileData.header' },
        { path: 'listReply', model: 'Comments' },
      ],
    });

    if (!actualite) {
      throw new HttpException('Actualite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }

  async findAllActualite(): Promise<actualite[] | undefined> {
    const actualite = await this.actualiteModule.find().populate({
      path: 'comments',
      model: 'Comments',
      populate: [
        { path: 'userId', model: 'User', select: 'profileData.header' },
        { path: 'listReply', model: 'Comments' },
      ],
    });
    if (!actualite) {
      throw new HttpException('No Actualite is Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }
  async findAllActualiteValid(): Promise<actualite[] | undefined> {
    const actualite = await this.actualiteModule.find({ status: true });
    if (!actualite) {
      throw new HttpException('No Actualite is Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }

  async deleteActualite(id: string): Promise<actualite | undefined> {
    const actualite = await this.actualiteModule.findOneAndDelete({ _id: id });
    if (!actualite) {
      throw new HttpException('Actualite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }
}
