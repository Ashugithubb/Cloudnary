import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTable } from './entities/file.entity';
import { Repository } from 'typeorm';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { promises as fs } from 'fs';
@Injectable()
export class UploadService {
    constructor(@InjectRepository(FileTable) private repo: Repository<FileTable>,
        private cloud: CloudnaryService,) { }


    async SaveMetaDate(file: Express.Multer.File, url: string) {
        const size = (Number)(file.size)
        const kb = Math.round(size / 1024);
        const data = {
            FileName: file.originalname,
            FileType: file.mimetype,
            FileSize: (String)(kb) + "kb",
            url: url
        }
        await this.repo.save(data)
        return url;
    }
    async uploadFile(file: Express.Multer.File) {
        const size = Number(file.size) * 1024;
        if (size > 10) {
            await this.SaveMetaDate(file, file.path);
        }
        else {
            try {
                const result = await this.cloud.uploadFileFromPath(file.path);
                await fs.unlink(file.path);
                return await this.SaveMetaDate(file, result)
            }
            catch (error) {
                throw new Error("Failed to upload image")
            }
        }
        return { msg: "File Uploaded" }
    }


    async UploadFileDirectToCloud(file: Express.Multer.File) {
        try {
            const url = await this.cloud.uploadFile(file);
            return await this.SaveMetaDate(file, url);
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to upload image');
        }
    }
}
