import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('apk')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: (req, file, cb) => {
        // Filtra archivos que no sean APK
        if (!file.originalname.match(/\.(apk)$/)) {
          return cb(new BadRequestException('Only APK files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAPK(@UploadedFile() file: Express.Multer.File): Promise<any> {
      return await this.appService.getAPKInfo(file.path);
    
  }
}
