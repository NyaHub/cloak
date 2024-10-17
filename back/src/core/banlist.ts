import fs from "node:fs"

const BANLIST_FILE = "../banlist.json"

export const banList = (() => {
    let lists = {
        ip: [],
        word: []
    }

    const _load = () => {
        lists = JSON.parse(fs.readFileSync(BANLIST_FILE).toString())
    }

    const _save = () => {
        fs.writeFileSync(BANLIST_FILE, JSON.stringify(lists))
    }

    let ret = {
        get ips() {
            return lists.ip
        },
        get words() {
            return lists.word
        },
        async add(val: string, type: "ip" | "word") {
            lists[type].push(val)
            _save()
        }
    }

    _load()
    return ret
})()