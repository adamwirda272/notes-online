<template>
    <div class="relative w-full h-full p-5 flex flex-col"
        :class="[app.navActive ? (app.mobile ? 'opacity-0' : '') : '']">

        <!--Toolbar-->
        <div class="w-full flex flex-row flex-nowrap gap-2">

            <!-- Undo/ Redo -->
            <div
                class="h-auto flex flex-nowrap p-2 gap-1 rounded-md mb-5 border border-[var(--border-color)] overflow-y-hidden overflow-x-auto">
                <button @click="editor?.chain().focus().undo().run()" :class="[
                    'text-2xl',
                    'font-bold',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[40px]',
                    'cursor-pointer',
                    'flex justify-center items-center',
                    editor?.can().undo() ? '' : 'text-[var(--secondary-text-color)]'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor"
                        viewBox="0 0 256 256">
                        <path
                            d="M232,144a64.07,64.07,0,0,1-64,64H80a8,8,0,0,1,0-16h88a48,48,0,0,0,0-96H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,45.66L51.31,80H168A64.07,64.07,0,0,1,232,144Z">
                        </path>
                    </svg>
                </button>

                <button @click="editor?.chain().focus().redo().run()" :class="[
                    'text-2xl',
                    'font-bold',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[40px]',
                    'flex justify-center items-center',
                    editor?.can().redo() ? '' : 'text-[var(--secondary-text-color)]'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor"
                        viewBox="0 0 256 256">
                        <path
                            d="M170.34,130.34,204.69,96H88a48,48,0,0,0,0,96h88a8,8,0,0,1,0,16H88A64,64,0,0,1,88,80H204.69L170.34,45.66a8,8,0,0,1,11.32-11.32l48,48a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32-11.32Z">
                        </path>
                    </svg>
                </button>
            </div>

            <!--Text editor-->
            <div class="h-auto flex flex-nowrap p-2 gap-1 rounded-md mb-5 border border-[var(--border-color)] overflow-y-hidden overflow-x-auto"
                :class="[app.mobile ? 'flex-1' : '']">
                <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :class="[
                    'text-2xl',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'shrink-0',
                    editor?.isActive('heading') ? 'bg-[var(--border-color)]' : ''
                ]">
                    H
                </button>
                <button @click="editor?.chain().focus().toggleBold().run()" :class="[
                    'text-2xl',
                    'font-bold',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'shrink-0',
                    editor?.isActive('bold') ? 'bg-[var(--border-color)]' : ''
                ]">
                    B
                </button>
                <button @click="editor?.chain().focus().toggleItalic().run()" :class="[
                    'text-2xl',
                    'italic',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'shrink-0',
                    editor?.isActive('italic') ? 'bg-[var(--border-color)]' : ''
                ]">
                    I
                </button>
                <button @click="editor?.chain().focus().toggleStrike().run()" :class="[
                    'text-2xl',
                    'line-through',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'shrink-0',
                    editor?.isActive('strike') ? 'bg-[var(--border-color)]' : ''
                ]">
                    S
                </button>

                <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="[
                    'text-2xl',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'flex justify-center items-center',
                    'shrink-0',
                    editor?.isActive('orderedList') ? 'bg-[var(--border-color)]' : ''
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor"
                        viewBox="0 0 256 256">
                        <path
                            d="M224,128a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM104,72H216a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16ZM216,184H104a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM43.58,55.16,48,52.94V104a8,8,0,0,0,16,0V40a8,8,0,0,0-11.58-7.16l-16,8a8,8,0,0,0,7.16,14.32ZM79.77,156.72a23.73,23.73,0,0,0-9.6-15.95,24.86,24.86,0,0,0-34.11,4.7,23.63,23.63,0,0,0-3.57,6.46,8,8,0,1,0,15,5.47,7.84,7.84,0,0,1,1.18-2.13,8.76,8.76,0,0,1,12-1.59A7.91,7.91,0,0,1,63.93,159a7.64,7.64,0,0,1-1.57,5.78,1,1,0,0,0-.08.11L33.59,203.21A8,8,0,0,0,40,216H72a8,8,0,0,0,0-16H56l19.08-25.53A23.47,23.47,0,0,0,79.77,156.72Z">
                        </path>
                    </svg>
                </button>

                <button @click="editor?.chain().focus().toggleBulletList().run()" :class="[
                    'text-2xl',
                    'p-1',
                    'rounded',
                    'h-[40px] w-[45px]',
                    'cursor-pointer',
                    'flex justify-center items-center',
                    'shrink-0',
                    editor?.isActive('bulletList') ? 'bg-[var(--border-color)]' : ''
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor"
                        viewBox="0 0 256 256">
                        <path
                            d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z">
                        </path>
                    </svg>
                </button>
            </div>

            <!--Empty-->
            <div v-if="!app.mobile" class="flex-1"></div>

            <!--Options-->
            <button v-on:click="noteContextMenuActive = !noteContextMenuActive"
                class="p-2 mb-5 flex justify-center relative items-center border border-[var(--border-color)] rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentcolor"
                    viewBox="0 0 256 256">
                    <path
                        d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z">
                    </path>
                </svg>
            </button>
            <ContextMenu :is-active="noteContextMenuActive" v-on:close="noteContextMenuActive = !noteContextMenuActive"
                :class="['absolute right-7 top-17 origin-top-right flex flex-col', noteContextMenuActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0']">
                <button v-on:click="notes.updateById(id, notes.cache[index].content)"
                    class="border-b border-[var(--border-color)] p-2 cursor-pointer hover:bg-[var(--border-color)] text-nowrap pl-5 pr-5">Save
                    notes
                </button>
                <button v-on:click="notes.deleteById(id)"
                    class="border-b border-[var(--border-color)] p-2 cursor-pointer hover:bg-[var(--border-color)] text-nowrap pl-5 pr-5">Delete
                    notes
                </button>
            </ContextMenu>

        </div>

        <!-- Editor -->
        <div class="flex-1 overflow-hidden">
            <EditorContent :editor="editor" class="w-full h-full overflow-y-auto" />
        </div>

        <div class="h-auto w-full p-5 text-right text-[var(--secondary-text-color)] text-nowrap">{{ status }}</div>

    </div>
</template>
<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const app = useAppStore()
const notes = useNotes()

const props = defineProps<{
    id: string
}>()

const index = ref<number>(notes.cache.findIndex(n => n.id === props.id))
const status = ref(`Updated at: ${new Date(notes.cache[index.value].updatedAt).toLocaleString()}`)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

const editor = useEditor({
    extensions: [
        StarterKit.configure({
            orderedList: {
                HTMLAttributes: {
                    class: 'list-decimal pl-5'
                }
            },
            bulletList: {
                HTMLAttributes: {
                    class: 'list-disc pl-5'
                }
            },
            paragraph: {
                HTMLAttributes: {
                    class: 'text-xl'
                }
            },
            heading: {
                HTMLAttributes: {
                    class: 'text-2xl'
                }
            }
        }),
    ],
    content: notes.cache[index.value].content,
    onUpdate({ editor }) {
        notes.cache[index.value].content = editor.getHTML()

        status.value = 'Edited'

        if (typingTimeout) clearTimeout(typingTimeout)
        typingTimeout = setTimeout(async () => {
            status.value = 'Saving...'
            await notes.updateById(props.id, notes.cache[index.value].content)
            status.value = `Updated at: ${new Date(notes.cache[index.value].updatedAt).toLocaleString()}`
        }, 2000)
    },
    editorProps: {
        attributes: {
            class: 'outline-none border-none h-full w-full',
            spellcheck: 'false',
        }
    }
})

const noteContextMenuActive = ref(false)

</script>