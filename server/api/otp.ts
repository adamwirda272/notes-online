import Otps from "../models/otps"
import { generateOTP, sendOTP } from "../utilities/mailer"
import validator from 'validator'

export default defineEventHandler(async (event) => {
    if (event.method !== 'POST') return

    const { email } = await readBody(event)

    const isEmail = validator.isEmail(email)

    if(!isEmail) return { status: 400, msg: 'Please input a valid email' }

    const existingEmail = await Otps.findOne({ where: { email: email }, raw: true })

    if (existingEmail && existingEmail.expireAt > new Date()) return { status: 400, msg: 'You can get verification code after 2 minutes' }

    try {
        await Otps.destroy({ where: { email: email } })
        const OTP = generateOTP()
        await Otps.create({ email: email, code: OTP })
        await sendOTP(email, OTP)
        return { status: 200, msg: 'Verification Sent, please check your email app' }
    } catch (error) {
        return { status: 500, msg: 'Internal server error' }
    }
})