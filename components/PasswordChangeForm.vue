<template>
    <form @submit.prevent="submit" :class="[app.mobile ? 'max-w-[95vw]' : '']"
        class="h-auto w-[450px] rounded-md border border-[var(--shadow-color)] shadow-lg p-8 text-[var(--text-color)] bg-[var(--header-bg)]">
        <div class="mb-7">
            <h1 class="text-2xl font-bold mb-1">Change password</h1>
            <p class="text-sm">Confirm your new password</p>
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm mb-1">Email address</label>
            <input v-model="email" id="email" type="email"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
        </div>

        <div class="mb-4 relative">
            <label for="code" class="block text-sm mb-1">Verification code</label>
            <input v-on:focus="onOTP = true" v-model="otp" id="code" type="text" minlength="4" maxlength="4"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
            <div v-on:click="getOTP"
                :class="otpStatus === 'sent' ? 'bg-[var(--article-bg)]' : 'bg-[var(--border-color)]'"
                class="absolute w-[70px] h-[42px] flex justify-center items-center text-center text-[var(--secondary-text-color)] cursor-pointer text-xs rounded-br-md rounded-tr-md border border-[var(--border-color)] right-0 bottom-0">
                <template v-if="otpStatus === ''">send</template>
                <template v-if="otpStatus === 'sending'">sending...</template>
                <template v-if="otpStatus === 'sent'">sent</template>
            </div>
        </div>

        <div v-if="onOTP" class="mb-4 text-sm text-[var(--secondary-text-color)]">
            {{ otpMsg }}
            <br><template v-if="otpStatus === 'sent'">You can resend your verification code in: {{ otpCountdown
                }}</template>
        </div>


        <div class="mb-4 relative">
            <label for="newPassword" class="block text-sm mb-1">New password</label>
            <input v-on:focus="onPassword = true" v-on:blur="onPassword = false" v-model="newPassword" id="newPassword"
                :type="passwordShown ? 'text' : 'password'" minlength="6" maxlength="25"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
            <div v-on:click="passwordShown = !passwordShown"
                :class="passwordShown ? 'bg-[var(--article-bg)]' : 'bg-[var(--border-color)]'"
                class="absolute w-[58px] h-[42px] flex text-center justify-center text-[var(--secondary-text-color)] cursor-pointer items-center text-xs px-4 py-2 rounded-br-md rounded-tr-md border border-[var(--border-color)] right-0 bottom-0">
                {{ passwordShown ? 'hide' : 'show' }}
            </div>
        </div>

        <div v-if="onPassword" class="mb-4 text-sm text-[var(--secondary-text-color)]">
            Create new password, minimum length: 6, max: 25
        </div>

        <div class="mb-4 relative">
            <label for="confirmPassword" class="block text-sm mb-1">Confirm password</label>
            <input v-on:focus="onConfirmPassword = true" v-on:blur="onConfirmPassword = false" v-model="confirmPassword"
                id="confirmPassword" :type="confirmPasswordShown ? 'text' : 'password'" minlength="6" maxlength="25"
                class="w-full px-4 py-2 rounded-md bg-[var(--article-bg)] border border-[var(--border-color)] focus:outline-none focus:ring"
                required />
            <div v-on:click="confirmPasswordShown = !confirmPasswordShown"
                :class="confirmPasswordShown ? 'bg-[var(--article-bg)]' : 'bg-[var(--border-color)]'"
                class="absolute w-[58px] h-[42px] flex text-center justify-center text-[var(--secondary-text-color)] cursor-pointer items-center text-xs px-4 py-2 rounded-br-md rounded-tr-md border border-[var(--border-color)] right-0 bottom-0">
                {{ confirmPasswordShown ? 'hide' : 'show' }}
            </div>
        </div>

        <div v-if="onConfirmPassword" class="mb-7 text-sm text-[var(--secondary-text-color)]">
            Repeat your password correctly
        </div>

        <div class="h-[10px] text-center mb-7" :class="[isError ? 'text-red-500' : '']">{{ status }}</div>

        <button type="submit"
            class="w-full mt-14 py-2 border rounded-md flex items-center justify-center cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]">
            Submit
        </button>

        <p class="mt-6 text-center text-sm">
            Done changing password?
            <NuxtLink to="/" class="font-medium hover:underline text-[var(--primary-color)]">Log in</NuxtLink>
        </p>
    </form>
</template>
<script setup lang="ts">
const app = useAppStore()

const onOTP = ref(false)
const onPassword = ref(false)
const onConfirmPassword = ref(false)

const email = ref('')
const otp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const otpStatus = ref('')
const otpMsg = ref('You need to verify your email address by clicking "send" to get your verification code')
const otpCountdown = ref('')
let countdownInterval: ReturnType<typeof setInterval>

const passwordShown = ref(false)
const confirmPasswordShown = ref(false)

const isLoading = ref(false)
const status = ref('')
const isError = ref(false)

const countdownSystem = () => {
    const ms = parseInt(localStorage.getItem('otp_expire_at')!) - Date.now()
    const rawSec = Math.floor(ms / 1000)
    const rawMin = Math.floor(rawSec / 60)

    const sec = rawSec % 60
    const min = rawMin

    otpCountdown.value = min <= 0 ? `${sec} seconds` : `${min} minutes ${sec} seconds`

    if (ms <= 0) {
        clearInterval(countdownInterval)
        otpCountdown.value = ''
        localStorage.removeItem('otp_expire_at')
        otpMsg.value = 'You can resend your verification code if there is no code received in your email app'
        otpStatus.value = ''
    }
}

async function getOTP() {
    onOTP.value = true
    if (otpStatus.value !== '') return
    otpStatus.value = 'sending'
    otpMsg.value = 'Sending verification code...'

    const fetch = await sendOTP(email.value)

    otpMsg.value = fetch.data.msg
    if (fetch.data.status !== 200) {
        otpStatus.value = ''
        return
    }
    localStorage.setItem('otp_expire_at', (Date.now() + 2 * 60 * 1000).toString())

    countdownSystem()
    countdownInterval = setInterval(countdownSystem, 1000)
    otpStatus.value = 'sent'
}

async function submit() {
    isError.value = false
    if (isLoading.value) return
    isLoading.value = true
    status.value = 'Updating password, please wait...'

    const fetch = await passwordUpdate(email.value, otp.value, newPassword.value, confirmPassword.value)

    if (fetch.data.status !== 200) {
        isError.value = true
        status.value = fetch.data.msg
        isLoading.value = false
        return
    }
    isError.value = false
    status.value = fetch.data.msg
    isLoading.value = false
    window.location.href = '/'
}
</script>