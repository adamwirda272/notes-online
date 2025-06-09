const ms = 156000

const rawSec = ms / 1000

const rawMinute = Math.floor(rawSec / 60)

const minute = rawMinute < 10 ? rawMinute.toString().padStart(2, '0') : rawMinute.toString()

const second = rawSec % 60 < 10 ? (rawSec % 60).toString().padStart(2, '0') : rawSec % 60

console.log(`${minute} minutes, ${second} seconds`)