import { Controller, FileTypeValidator, InternalServerErrorException, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { promises as fs } from 'fs';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
    constructor(private cloud: CloudnaryService,
        private uploadService: UploadService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                callback(null, `${file.fieldname}-${uniqueSuffix}-${extname(file.originalname)}`) }
        })
    }))
    async uploadFile(@UploadedFile(new ParseFilePipe({
        fileIsRequired: true,
        validators: [new MaxFileSizeValidator({ maxSize: 1000000 }),]
    })) file: Express.Multer.File) {
        return this.uploadService.uploadFile(file);
    }



    @Post('cloud')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage()
    }))
    async UploadFileDirectToCloud(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.UploadFileDirectToCloud(file)
    }

}



























//2.SERVER TO CLOUD
// @Post('severtocloud')
// @UseInterceptors(FileInterceptor('file', { //file that we are going to upload, it uses mullter middleware
//     storage: diskStorage({
//         destination: './files',
//         filename: (req, file, callback) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//             callback(null, `${file.fieldname}-${uniqueSuffix}-${extname(file.originalname)}`)
//         }
//     })
// }))
// async uploadFileOnCloudFromServer(@UploadedFile(new ParseFilePipe({
//     fileIsRequired: true,
//     validators: [new MaxFileSizeValidator({ maxSize: 1000000 }),]  //new FileTypeValidator({fileType : 'image/png'})
// })) file: Express.Multer.File) {

//     try {
//         const result = await this.cloud.uploadFileFromPath(file.path);
//         await fs.unlink(file.path);
//         return await this.uploadService.SaveMetaDate(file, result)
//     }
//     catch (error) {
//         throw new Error("Failed to upload image")
//     }
// }
