import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private mail:MailService){}
    @Post()
   async SendEmail(@Body() data){
        const email = data.email;
        console.log(email);
     return await this.mail.SendMail(email);
    }
}
