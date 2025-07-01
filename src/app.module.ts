import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { CloudnaryService } from './cloudnary/cloudnary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudnaryModule } from './cloudnary/cloudnary.module';
import { FileTable } from './upload/entities/file.entity';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
    
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<string>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [FileTable],
      
        synchronize: true,
      })}),UploadModule, CloudnaryModule],
  controllers: [AppController],
  providers: [AppService, CloudnaryService],
})
export class AppModule {}
