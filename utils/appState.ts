import { defineStore } from 'pinia'
import checkAuth from '~/middleware/checkAuth'
import axios from 'axios'

export const appState = defineStore('appState', () => {
    const isMobile = ref()

    const appTheme = ref()
    const changeAppTheme = () => {
        appTheme.value = appTheme.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('appTheme', appTheme.value)
    }

    const isNavActive = ref(true)
    const toggleNav = () => {
        isNavActive.value = !isNavActive.value
    }

    const notelist = ref()
    const notelistAdd = (data: {}) => {
        if (Array.isArray(notelist.value)) {
            notelist.value.push(data)
        }
    }
    const getNotelist = async () => {
        const accessToken = await checkAuth()

        const fetch = await axios.get('/api/notes', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus(status) {
                return status <= 500
            },
        })

        notelist.value = fetch.data.noteList
    }

    const isProfileModalActive = ref(false)

    const userEmail = ref('')

    const notesCache = ref<Array<{ id: string, content: string, updatedAt: Date, createdAt: Date }>>([])
    const updateNotes = async (id: string, content: string) => {
        const accessToken = await checkAuth()

        await axios.patch(`/api/notes/${id}`, {
            content: content
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus: status => status <= 500,
        })
        notesCache.value.find(n => n.id === id)!.updatedAt = new Date(Date.now())
        await getNotelist()
    }

    const deleteNote = async (id: string) => {
        const inNote = window.location.pathname === '/notes/' + id
        const accessToken = await checkAuth()

        const deleted = notesCache.value.filter(n => n.id !== id)

        notesCache.value = deleted

        await axios.delete('/api/notes/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (inNote) {
            navigateTo('/notes')
        }

        await getNotelist()
    }

    const setup = () => {
        isMobile.value = window.innerWidth < 700
        window.addEventListener('resize', () => {
            isMobile.value = window.innerWidth < 700
        })

        appTheme.value = localStorage.getItem('appTheme') || 'light'
    }

    return {
        isMobile,
        appTheme,
        changeAppTheme,
        isNavActive,
        toggleNav,
        notelist,
        notelistAdd,
        getNotelist,
        isProfileModalActive,
        userEmail,
        notesCache,
        updateNotes,
        deleteNote,
        setup
    }
})