import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(fs.readFile);
@Injectable()
export class MailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })
    }



  async SendMail(email: string) {
    console.log({__dirname});
    const templatePath = `./template/invitation.hbs`;
    const templateSource = await readFileAsync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({}); // Pass context if needed

    const mailOption = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Birthday wish",
        html: html
    };
    await this.transporter.sendMail(mailOption);
    return { "msg": `email is sent to ${email}` }
}
}
// /home/ashutosh/Desktop/Backend/cloud/src/mail/template/Invitation.hbs