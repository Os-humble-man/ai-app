import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from '../utils/template/verification.email';

@injectable()
export class MailService {
   private transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      service: process.env.SMTP_SERVICE,
      secure: process.env.NODE_ENV === 'production', // true for 465, false for other ports
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
   });
   sendVerificationEmail = async (email: string, token: string) => {
      const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
      const mailOptions = {
         from: process.env.SMTP_FROM_EMAIL,
         to: email,
         subject: 'Verify your email address',
         html: verificationEmailTemplate(verificationLink),
      };
      await this.transporter.sendMail(mailOptions);
   };

   sendPasswordResetEmail = async (email: string, token: string) => {
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
      const mailOptions = {
         from: process.env.SMTP_FROM_EMAIL,
         to: email,
         subject: 'Reset your password',
         html: verificationEmailTemplate(resetLink),
      };
      await this.transporter.sendMail(mailOptions);
   };
}
