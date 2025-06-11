import Otps from "~/server/models/otps"
import Users from "~/server/models/users"
import validator from 'validator'
import Argon2 from 'argon2'

export default defineEventHandler(async (event) => {
    if (event.method !== 'PATCH') return

    const { email, verifCode, newPassword, confirmPassword } = await readBody(event)

    if (!email || !verifCode || !newPassword || !confirmPassword) return { status: 400, msg: 'Please complete all fields' }

    if (!validator.isEmail(email)) return { status: 200, msg: 'Please use a valid email' }

    if(newPassword !== confirmPassword) return { status: 401, msg: 'New password and confirmed password doesn`t match' }

    const hashedPassword = await Argon2.hash(newPassword)
    const OTP = await Otps.findOne({ where: { email: email }, raw: true })
    const isVerified = OTP?.code === verifCode

    if (!isVerified) return { status: 400, msg: 'Wrong verification code' }

    const isUserExist = await Users.findOne({ where: { email: email }, raw: true })

    if(!isUserExist) return { status: 404, msg: 'User not found' }

    try {
        await Users.update({ password: hashedPassword }, { where: { email: email } })
        return { status: 200, msg: 'Password reset success, try sign in again' }
    } catch (error) {
        return { status: 500, msg: 'Internal server error' }
    }
})