const LOG = true
const MAX_NUMBER_OF_GAMES = 100

function keepItems(map, n) {
  const entriesArray = [...map.entries()]
  const remainingEntries = entriesArray.slice(-n)

  return new Map(remainingEntries)
}

class GameList {
  #games

  constructor() {
    this.#games = new Map()
  }

  // Debugging
  #logList() {
    if(!LOG) return

    const gameList = [...this.#games.keys()].join(', ')
    console.log(`Current games (${this.#games.size}): ${gameList}`)
  }

  add(id, game) {
    this.#games.set(id, game)
    this.#purgue()

    this.#logList()
  }

  remove(id) {
    this.#games.delete(id)

    this.#logList()
  }

  #purgue() {
    this.#games = keepItems(this.#games, MAX_NUMBER_OF_GAMES)
  }

  get(id) {
    return this.#games.get(id)
  }
}

const games = new GameList()

export default games
