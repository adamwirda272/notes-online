import Notes from "~/server/models/notes";
import auth from "~/server/middlewares/auth";
import getTitle from "~/server/utilities/getTitle";

export default defineEventHandler(async (event) => {
    await auth(event)
    const userId = event.context.user.id

    try {
        const createNotes = await Notes.create({ content: '<p>Untitled</p>', userId: userId })
        const newNotes = createNotes.get({ plain: true })
        const notes = {
            id: newNotes.id,
            title: getTitle(newNotes.content),
            updatedAt: newNotes.updatedAt,
            createdAt: newNotes.createdAt
        }
        return { status: 200, notes: notes }
    } catch (error) {
        return { status: 500, msg: 'internal server error' }
    }
})