import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
(global as any).crypto = crypto;
async function bootstrap() {
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets( join(__dirname,"..",'files'),{
    prefix : '/files'
  }
  )
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // if using cookies
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
