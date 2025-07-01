import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTable } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
    constructor(@InjectRepository(FileTable) private repo: Repository<FileTable>) { }
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
}
