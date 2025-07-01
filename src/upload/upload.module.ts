import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTable } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileTable])],
  controllers: [UploadController],
  providers:[CloudnaryService, UploadService]
})
export class UploadModule {}
