import { defineStore } from "pinia"

const useAppStore = defineStore('app', () => {
    const mobile = ref<boolean>()
    const theme = ref<'light' | 'dark'>()
    const navActive = ref<boolean>()
    const profileModalActive = ref<boolean>()

    const setAppTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('appTheme', theme.value)
    }
    const setNav = () => navActive.value = !navActive.value
    const setProfileModal = () => profileModalActive.value = !profileModalActive.value

    const setup = () => {
        mobile.value = window.innerWidth < 700
        window.addEventListener('resize', () => {
            mobile.value = window.innerWidth < 700
        })

        const localTheme = localStorage.getItem('appTheme')

        theme.value = localTheme === 'dark' || localTheme === 'light' ? localTheme : 'light'
    }

    return {
        mobile,
        theme,
        navActive,
        setAppTheme,
        profileModalActive,
        setNav,
        setProfileModal,
        setup
    }
})

export default useAppStore