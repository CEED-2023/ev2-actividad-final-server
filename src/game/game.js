import {
  MINE_CHARACTER,
  initializeMinesweeper
} from './minesweeper.js'
import {
  GameAlreadyStarted,
  PlayerAlreadyJoined,
  PlayerNotFound,
  PlayerIsNotPlaying,
  GameNotInProgress,
  CellAlreadyPlayed,
  MineTriggered
} from './game_exceptions.js'

const NO_PLAYER = '0'
const WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS'
const PLAYING = 'PLAYING'
const GAME_OVER = 'GAME_OVER'


class Player {
  constructor(name) {
    this.name = name
    this.state = PLAYING
  }
}

class Game {
  #creatorPlayer
  #players

  #height
  #width
  #numMines

  #board
  #state

  constructor(creatorPlayer, height, width, numMines) {
    this.#creatorPlayer = creatorPlayer
    this.#height = height
    this.#width = width
    this.#numMines = numMines
    this.#initialize()
  }

  get height() { return this.#height }
  get width() { return this.#width }
  get numMines() { return this.#numMines }

  #initialize() {
    this.#board = []
    this.#players = []
    this.#state = WAITING_FOR_PLAYERS
  }

  get creator() {
    return this.#creatorPlayer
  }

  get state() {
    const texts = {
      WAITING_FOR_PLAYERS: 'Waiting for players',
      PLAYING: 'Playing',
      GAME_OVER: 'Finished'
    }
    return texts[this.#state]
  }

  join(playerName) {
    if(this.#state !== WAITING_FOR_PLAYERS) {
      throw new GameAlreadyStarted()
    }

    if(this.#players.find(player => player.name === playerName)) {
      throw new PlayerAlreadyJoined()
    }

    this.#players.push(new Player(playerName))
  }

  abandon(playerName) {
    console.log(`Player ${playerName} abandoned`)
    const player = this.#players.find(player => player.name === playerName)
    if(!player) {
      console.log(`Player ${playerName} not found in game`)
      return false
    }

    // If game hasn't started, just remove
    if(this.#state === WAITING_FOR_PLAYERS) {
      this.#players = this.#players.filter(player => player.name !== playerName)
      return
    }

    // If game has started, set player state to GAME_OVER
    player.state = GAME_OVER

    // TO-DO: check if all players are GAME_OVER and finish game

    return true
  }

  // We initialize the game with a clicked row and column
  // because the first position won't have a mine
  initialize(firstClickedRow, firstClickedCol) {
    const board = initializeMinesweeper(
      this.#height, this.#width, this.#numMines,
      [firstClickedRow, firstClickedCol]
    )

    // The player who clicked is stored in the cell
    this.#board = board.map(
      row => row.map(
        cell => {
          return {
            player: null,
            content: cell
          }
      })
    )

    // The first cell has no player
    this.#board[firstClickedRow][firstClickedCol].player = NO_PLAYER

    // DEBUG
    console.log(this.board.join('\n'))
  }

  // DEBUG
  get board() {
    let lines = []
    for (let row = 0; row < this.#height; row++) {
      lines.push(this.#board[row].map(c => c.content).join(' '))
    }
    return lines
  }

  get players() {
    return [...this.#players]
  }

  #checkplayer(player) {
    if(!player) throw new PlayerNotFound()
    if(player.state !== PLAYING) throw new PlayerIsNotPlaying()
  }

  #checkAlreadyPlayed(cell) {
    if(cell.player !== null) throw new CellAlreadyPlayed()
  }

  #checkMine(cell, player) {
    if(cell.content !== MINE_CHARACTER) return
    player.state = GAME_OVER
    throw new MineTriggered()
  }

  play(playerName, row, col) {
    // The game will start on the first click
    if(this.#state == WAITING_FOR_PLAYERS && playerName === this.#creatorPlayer) {
      console.log('Initializing game')
      this.initialize(row, col)
      this.#state = PLAYING
      return this.#board[row][col].content
    }

    if(this.#state !== PLAYING) throw new GameNotInProgress()

    const player = this.#players.find(player => player.name === playerName)
    this.#checkplayer(player)

    const cell = this.#board[row][col]
    this.#checkAlreadyPlayed(cell)
    cell.player = playerName
    this.#checkMine(cell, player)

    return cell.content
  }

  // Throws exception if player can't flag cell
  canFlag(playerName, row, col) {
    if(this.#state !== PLAYING) throw new GameNotInProgress()

    const player = this.#players.find(player => player.name === playerName)
    this.#checkplayer(player)

    const cell = this.#board[row][col]
    this.#checkAlreadyPlayed(cell)
  }

  // DEBUG: for reseting game while testing
  reset() {
    this.#initialize()
  }

}

export default Game
