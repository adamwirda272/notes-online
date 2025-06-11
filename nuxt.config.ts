import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@pinia/nuxt'],
	vite: {
		plugins: [tailwindcss()]
	},
	nitro: {
		preset: 'vercel'
	},
	runtimeConfig: {
		DB_USER: process.env.DB_USER,
		DB_PW: process.env.DB_PW,
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,
		DB_NAME: process.env.DB_NAME,
		APP_ENV: process.env.APP_ENV,
		REFRESH_TOKEN: process.env.REFRESH_TOKEN,
		ACCESS_TOKEN: process.env.ACCESS_TOKEN,
		MAILER_API_KEY: process.env.MAILER_API_KEY,
	}
})