import Otps from "../models/otps"
import Users from "../models/users"
import Argon2 from 'argon2'
import validator from 'validator'

export default defineEventHandler(async (event) => {
    if (event.method !== 'POST') return { status: 401, msg: 'Unauthorized' }

    const { email, password, confirmPassword, verifCode } = await readBody(event)
    if(!email || !password || !confirmPassword || !verifCode) return { status: 400, msg: 'Please complete all fields' }
    if(!validator.isEmail(email)) return { status: 400, msg: 'Please use a valid email address' }
    if (password !== confirmPassword) return { status: 400, msg: 'Password and confirmed password doesn`t match' }

    const hashedPassword = await Argon2.hash(password)

    const existingUser = await Users.findOne({ where: { email: email }, raw: true })

    if (existingUser) return { status: 403, msg: 'Email already exist' }

    const OTP = await Otps.findOne({
        where: {
            email: email
        },
        raw: true
    })

    const isVerified = verifCode === OTP?.code

    if (!isVerified) return { status: 401, msg: 'Wrong verification code' }

    try {
        await Users.create({ email: email, password: hashedPassword })
        return { status: 200, msg: 'Account created' }
    } catch (error) {
        return { status: 500, msg: 'Internal server error' }
    }
})