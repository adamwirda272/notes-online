<template>
    <div v-if="app.profileModalActive" v-on:click="app.setProfileModal"
        class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-90"
        :class="[app.mobile ? 'bg-black opacity-45' : '']"></div>

    <div :class="[
        'absolute',
        'bg-[var(--header-bg)]',
        'shadow-md',
        'z-100',
        'overflow-hidden',
        app.mobile ? 'w-full h-[80vh] bottom-0 origin-bottom' : 'w-[350px] h-auto top-[48px] right-5 rounded-xl origin-top-right',
        app.profileModalActive ? (app.mobile ? 'scale-y-100 ' : 'scale-100 opacity-100') : (app.mobile ? 'scale-y-0' : 'scale-0 opacity-0')
    ]">
        <div class="w-full p-5">{{ user.email }}</div>

        <button v-on:click="signOut"
            class="w-full p-5 border-t border-[var(--border-color)] cursor-pointer hover:bg-[var(--border-color)] text-red-500">{{
                isLoading ? 'Signing out...' : 'Sign out' }}</button>
    </div>
</template>

<script setup lang="ts">
const app = useAppStore()
const user = userStore()

const isLoading = ref(false)

const signOut = async () => {
    if (isLoading.value) return
    
    isLoading.value = true
    await logout()
    navigateTo('/')
}
</script>