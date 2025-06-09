import { Resend } from "resend";

const mailer = new Resend(process.env.MAILER_API_KEY!)

export const generateOTP = (length = 4) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

export const sendOTP = async (email: string, code: string) => {
    const mail = await mailer.emails.send({
        from: 'NotesOnline <noreply@notesonline.my.id>',
        to: email,
        subject: 'Verification code',
        html: `<p>Your verification code is: <strong>${code}</strong></p><p>Valid for 2 minutes</p>`
    })

    return mail
}