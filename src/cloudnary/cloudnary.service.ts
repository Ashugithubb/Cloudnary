import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
@Injectable()
export class CloudnaryService {
    
constructor(){
  cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_SECRET_KEY
    });}
    
    
     async uploadFileFromPath(path: string): Promise<string> {
      const  MaxAttempts = 3;
      const time = 3000;
      for(let attempts = 1; attempts<=MaxAttempts;attempts++){
         try {
             const uploadResult = await cloudinary.uploader.upload(path, {
              folder: 'zenmonk',
              });
             
              return uploadResult.secure_url;
             } 
             catch (error) {
                    console.warn(`Upload attempt ${attempts} failed:`, error.message);

                  if (attempts < MaxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log(`Retrying upload... (attempt ${attempts + 1})`);
        } else {
          throw new InternalServerErrorException('Upload failed after retries');
        }
                          }}
     }
  
    //upload to RAM TO CLOUDNARY
 async uploadFile(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'zenmonk',public_id: `zen-${Date.now()}` },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result.secure_url);
      },
    );
    Readable.from(file.buffer).pipe(uploadStream);
  });
}

    
    }
    
    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg'cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
   

