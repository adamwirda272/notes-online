<template>
    <form @submit.prevent="submit" :class="[app.mobile ? 'max-w-[95vw]' : '']"
        class="w-[450px] h-auto rounded-md border border-[var(--shadow-color)] shadow-lg p-8 text-[var(--text-color)] bg-[var(--header-bg)]">
        <!-- Header -->
        <div class="mb-7">
            <h1 class="text-2xl font-bold mb-1">Sign in to NotesOnline</h1>
            <p class="text-sm">
                Please enter your details
            </p>
        </div>

        <!-- Email Input -->
        <div class="mb-4">
            <label for="email" class="block text-sm mb-1">
                Email address
            </label>
            <input v-model="email" id="email" type="email"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
        </div>

        <!-- Password Input -->
        <div class="mb-4 relative">
            <label for="password" class="block text-sm mb-1">
                Password
            </label>
            <input v-model="password" id="password" :type="passwordShown ? 'text' : 'password'" minlength="6"
                maxlength="25"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
            <div v-on:click="passwordShown = !passwordShown"
                :class="passwordShown ? 'bg-[var(--article-bg)]' : 'bg-[var(--border-color)]'"
                class="absolute w-[58px] h-[42px] flex text-center text-[var(--secondary-text-color)] cursor-pointer items-center text-xs px-4 py-2 rounded-br-md rounded-tr-md border border-[var(--border-color)] right-0 bottom-0">
                {{ passwordShown ? 'hide' : 'show' }}</div>
        </div>

        <!-- Options Row -->
        <div class="flex justify-end items-center mb-4 text-sm">
            <NuxtLink to="/password/change" class="hover:underline text-[var(--primary-color)]">
                Forgot password?
            </NuxtLink>
        </div>

        <div class="h-[10px] text-center mb-7" :class="[isError ? 'text-red-500' : '']">{{ message }}</div>

        <!-- Sign in -->
        <button type="submit"
            class="w-full py-2 border rounded-md flex items-center justify-center cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]">
            Sign in
        </button>

        <!-- Bottom Link -->
        <p class="mt-6 text-center text-sm">
            Don’t have an account?
            <NuxtLink to="/register" class="font-medium hover:underline text-[var(--primary-color)]">Sign up</NuxtLink>
        </p>
    </form>
</template>

<script setup lang="ts">
const app = useAppStore()

// user data to be stored
const email = ref('')
const password = ref('')
const passwordShown = ref(false)

// response status to be shown
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)

// yeah submit ofc
async function submit() {
    isError.value = false
    if (isLoading.value) return

    isLoading.value = true
    message.value = 'Signing in...'

    const fetch = await login(email.value, password.value)

    if (fetch.data.status !== 200) {
        isError.value = true
        message.value = fetch.data.msg
        isLoading.value = false
        return
    }
    isError.value = false
    message.value = fetch.data.msg
    isLoading.value = false

    window.location.href = '/notes'
}
</script>