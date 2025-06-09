import { JSDOM } from 'jsdom'

export default function getTitle(content: string) {
    const dom = new JSDOM(`<html><body>${content}</body></html>`).window.document
    const title = dom.querySelector('body')?.firstChild?.textContent as string

    return title
}