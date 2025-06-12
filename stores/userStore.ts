import { defineStore } from "pinia";

const userStore = defineStore('user', () => {
    const email = ref<string>()

    return {
        email
    }
})

export default userStore