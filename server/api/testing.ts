import Users from "../models/users"
import Notes from "../models/notes"
import { generateOTP, sendOTP } from "../utilities/mailer"
import Otps from "../models/otps"

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        try {
            await Otps.sync()
            return { msg: 'ok' }
        } catch (error) {
            return { msg: 'Internal server error' }
        }
    }
})