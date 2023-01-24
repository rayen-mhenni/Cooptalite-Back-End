import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  NotFoundException,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CommentsService } from './comments.service';
import { comment } from 'src/actualite/dtos/actualiteDTO';

@Controller('api/comments')
export class commentsController {
  constructor(private CommentsService: CommentsService) {}

  //************************************ comment ******************************************************* */

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Post('/')
  async addComment(@Body() comment: comment) {
    const role = await this.CommentsService.addComment(comment);
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Delete('/:id')
  async DeleteComment(@Param('id') id: string) {
    const Comment = await this.CommentsService.deleteComment(id);
    if (!Comment) throw new NotFoundException('Comment does not exist!');
    return { message: 'Comment DELETED ' };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get('/')
  async findComment() {
    const comment = await this.CommentsService.findComment();
    if (!comment) throw new NotFoundException('Comment does not exist!');
    return comment;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Put('/:id')
  async updateComment(@Param('id') id: string, @Body() comment: comment) {
    const ucomment = await this.CommentsService.updateComment(id, comment);
    if (!ucomment) throw new NotFoundException('Comment does not exist!');
    return ucomment;
  }
}
