import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from './app.service';
import { multerConfig, multerOptions } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('upload/:filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    try {
      return res.sendFile(image, { root: multerConfig.dest });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
  @Delete('upload/:filename')
  DeleteUploadedFile(@Param('filename') filename) {
    try {
      const filePath = multerConfig.dest + '/' + filename;
      fs.unlinkSync(filePath);

      return 'file deleted';
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const response = {
      originalname: file?.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];

    files.forEach((file) => {
      const fileReponse = {
        originalname: file?.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
