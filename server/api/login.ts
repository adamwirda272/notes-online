import Users from "../models/users";
import Argon2 from "argon2";
import JWT from "jsonwebtoken";
import validator from 'validator'

export default defineEventHandler(async (event) => {
    if (event.method !== 'POST') return { status: 400, msg: 'Unauthorized' }
    const { email, password } = await readBody(event)

    if(!email || !password) return { status: 400, msg: 'Please complete all fields' }
    if(!validator.isEmail(email)) return { status: 400, msg: 'Email address not valid' }

    const existingUser = await Users.findOne({ where: { email: email }, raw: true })
    if (!existingUser) return { status: 400, msg: 'Wrong email or password' }

    const isPasswordVerified = await Argon2.verify(existingUser!.password, password)

    if (!isPasswordVerified) return { status: 400, msg: 'Wrong email or password' }

    const refreshToken = JWT.sign({
        id: existingUser!.id,
        email: existingUser!.email,
    }, process.env.REFRESH_TOKEN!, {
        expiresIn: '7d'
    })

    await Users.update({ refreshToken: refreshToken }, { where: { id: existingUser!.id } })

    setCookie(event, 'refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.APP_ENV === 'prod',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return { status: 200, msg: 'Log in success' }
})