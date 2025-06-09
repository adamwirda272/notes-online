<script setup lang="ts">
	import '~/assets/app.css'
	import { appState } from '#imports';

	const context = appState()

	onMounted(() => {
		context.setup()
	})
</script>
<template>
	<div id="root" class="w-full h-full text-[var(--text-color)]" :app-theme="context.appTheme">
		<NuxtLayout>
			<NuxtPage/>
		</NuxtLayout>
	</div>
</template>