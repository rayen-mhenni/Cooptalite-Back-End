/// <reference types="multer" />
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    seeUploadedFile(image: any, res: any): any;
    uploadFile(file: Express.Multer.File): {
        originalname: string;
        filename: string;
    };
    uploadMultipleFiles(files: any): Promise<any[]>;
}
