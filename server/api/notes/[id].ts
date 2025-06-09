import auth from "~/server/middlewares/auth"
import Notes from "~/server/models/notes"

export default defineEventHandler(async (event)=> {
    await auth(event)
    const userId = event.context.user.id
    const id = getRouterParam(event, 'id')

    if (event.method === 'GET') {
        try {
            const notes = await Notes.findOne({ where: { id: id, userId: userId }, raw: true })
            return { status: 200, notes }
        } catch (error) {
            return { status: 500, msg: 'internal server error' }
        }
    }
    if (event.method === 'PATCH') {
        const { content } = await readBody(event)

        try {
            await Notes.update({ content: content }, { where: { id: id, userId: userId } })
            return { status: 200 }
        } catch (error) {
            return { status: 500, msg: 'internal server error' }
        }
    }
    if (event.method === 'DELETE') {
        try {
            await Notes.destroy({ where: { id: id, userId: userId } })
            return { status: 200 }
        } catch (error) {
            return { status: 500, msg: 'internal server error' }
        }
    }
})