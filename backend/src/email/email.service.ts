import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async send(data: SendEmailDto) {
    this.logger.log(`Попытка отправить письмо от ${data.email}`);

    await this.mailerService.sendMail({
      to: 'dmytrobarbara1@gmail.com',
      subject: `Новый вопрос от ${data.name}`,
      template: './contact',
      context: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
      html: `
        <p>Имя: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <hr>
        <p>Сообщение:</p>
        <p>${data.message}</p>
      `,
    });

    this.logger.log(`Письмо успешно отправлено.`);
  }
}
