<template>
    <!--default layour for the whole app-->

    <!--Header in notes-->
    <header
        class="relative w-full h-[48px] bg-[var(--header-bg)] shadow-md z-30 flex flex-row items-center justify-between overflow-hidden">

        <div class="flex flex-row items-center h-full">
            <button v-on:click="app.setNav"
                class="cursor-pointer hover:bg-[var(--shadow-color)] h-full p-5 rounded-br-full rounded-tr-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentcolor"
                    viewBox="0 0 256 256">
                    <path
                        d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z">
                    </path>
                </svg>
            </button>
        </div>

        <div class="flex flex-row items-center h-full pl-4">
            <ToggleTheme :app="app" size="28" />
            <ToggleProfile size="35" />
        </div>

    </header>

    <!--Container for navigation bar and notepad-->
    <div class="relative flex flex-row w-full h-[calc(100%-48px)] bg-[var(--nav-bg)]">

        <!--Navigation bar-->
        <nav :class="[
            'bg-[var(--nav-bg)]',
            'h-full',
            'shadow-md',
            'relative',
            'overflow-hidden',
            app.navActive ? 'opacity-100' : 'opacity-0',
            app.mobile ? (app.navActive ? 'w-full' : 'w-[0%]') : (app.navActive ? 'w-[350px]' : 'w-[0px]')
        ]">
            <ul v-if="!isLoaded" class="w-full h-[calc(100%-60px)] p-5 overflow-x-hidden overflow-y-auto text-nowrap">
                <li
                    class="w-full p-5 border-b-2 border-[var(--border-color)] flex items-center hover:bg-[var(--border-color)] rounded-md cursor-pointer">
                    Loading...</li>
            </ul>

            <ul v-else-if="isLoaded"
                class="w-full h-[calc(100%-60px)] p-5 flex flex-col gap-1 overflow-x-hidden overflow-y-auto text-nowrap">
                <li v-on:click="app.mobile ? app.setNav() : null" v-for="list in notes.list"
                    :key="list.id">

                    <NuxtLink :to="{ name: 'notes-id', params: { id: list.id } }"
                        class="w-full p-3 border-b-2 border-[var(--border-color)] flex flex-row items-center hover:bg-[var(--border-color)] rounded-md cursor-pointer"
                        :class="[useRoute().params.id === list.id ? 'bg-[var(--border-color)]' : '']">

                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentcolor"
                            viewBox="0 0 256 256">
                            <path
                                d="M92,96a4,4,0,0,1,4-4h64a4,4,0,0,1,0,8H96A4,4,0,0,1,92,96Zm4,36h64a4,4,0,0,0,0-8H96a4,4,0,0,0,0,8Zm32,24H96a4,4,0,0,0,0,8h32a4,4,0,0,0,0-8ZM220,48V156.69a11.9,11.9,0,0,1-3.52,8.48l-51.31,51.32a11.93,11.93,0,0,1-8.48,3.51H48a12,12,0,0,1-12-12V48A12,12,0,0,1,48,36H208A12,12,0,0,1,220,48ZM48,212H156V160a4,4,0,0,1,4-4h52V48a4,4,0,0,0-4-4H48a4,4,0,0,0-4,4V208A4,4,0,0,0,48,212Zm158.35-48H164v42.35Z">
                            </path>
                        </svg>

                        <div class="flex flex-col pl-2">
                            <span>{{ list.title }}</span>
                            <span class="text-[var(--secondary-text-color)] ">Updated: {{ new
                                Date(list.updatedAt).toLocaleString() }}</span>
                        </div>
                    </NuxtLink>
                </li>
            </ul>

            <CreateNotesBtn :use-icon="true"
                class="relative h-[60px] bg-[var(--nav-bg)] flex flex-row items-center gap-2 w-full pr-5 pl-5 text-left border-t-2 border-[var(--border-color)] hover:bg-[var(--border-color)] rounded-tr-md rounded-tl-md cursor-pointer text-nowrap" />
        </nav>

        <!--Canvas area/content-->
        <article :class="[
            'bg-[var(--article-bg)]',
            'h-full',
            'shadow-md',
            'relative',
            'overflow-hidden',
            app.mobile ? (app.navActive ? 'w-[0%]' : 'w-full') : (app.navActive ? 'w-[calc(100%-350px)]' : 'w-full')
        ]">
            <slot />
        </article>
    </div>

    <!--teleporting dynamic profile modal-->
    <ProfileModal />
</template>

<script setup lang="ts">

// load global stores
const app = useAppStore()
const notes = useNotes()
const isLoaded = ref(false)

// fetch notes list to be shown in navigation bar
onMounted(async () => {
    await notes.getList()
    isLoaded.value = true
})
</script>