import auth from "~/server/middlewares/auth"
import Notes from "~/server/models/notes"

export default defineEventHandler(async (event) => {
    await auth(event)
    const userId = event.context.user.id
    const id = getRouterParam(event, 'id')

    try {
        const notes = await Notes.findOne({ where: { id: id, userId: userId }, raw: true })
        return { status: 200, notes }
    } catch (error) {
        return { status: 500, msg: 'internal server error' }
    }
})