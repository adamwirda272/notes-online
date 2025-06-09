<template>
    <div class="bg-[var(--bg-color)] w-full h-full flex items-center justify-center">
        <ToggleTheme size="28" :class="['absolute top-5 right-5']"/>
        <slot/>
    </div>
</template>