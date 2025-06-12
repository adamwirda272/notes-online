<template>
	<div id="root" class="w-full h-full text-[var(--text-color)]" :app-theme="app.theme">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import '~/assets/app.css'
import useAppStore from './stores/useAppStore'
const app = useAppStore()

onMounted(() => {
	app.setup()
})
</script>