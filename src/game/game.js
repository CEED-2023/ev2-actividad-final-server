import {
  MINE_CHARACTER,
  initializeMinesweeper
} from './minesweeper.js'
import {
  GameNotInProgress
} from './game_exceptions.js'

const WAITING_FIRST_MOVE = 'WAITING_FOR_PLAYERS'
const PLAYING = 'PLAYING'
const GAME_OVER = 'GAME_OVER'


class Game {
  #creatorPlayer

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
    this.#state = WAITING_FIRST_MOVE
  }

  get creator() {
    return this.#creatorPlayer
  }

  get state() {
    const texts = {
      WAITING_FIRST_MOVE: 'Waiting first move',
      PLAYING: 'Playing',
      GAME_OVER: 'Finished'
    }
    return texts[this.#state]
  }

  // We initialize the game with a clicked row and column
  // because the first position won't have a mine
  initialize(firstClickedRow, firstClickedCol) {
    this.#board = initializeMinesweeper(
      this.#height, this.#width, this.#numMines,
      [firstClickedRow, firstClickedCol]
    )
    // DEBUG: print board on console
    console.log(this.board.join('\n'))
  }

  // DEBUG
  get board() {
    let lines = []
    for (let row = 0; row < this.#height; row++) {
      lines.push(this.#board[row].join(' '))
    }
    return lines
  }

  #checkMine(cell) {
    if(cell !== MINE_CHARACTER) return
    this.#state = GAME_OVER
    // throw new MineTriggered()
  }

  play(row, col) {
    // The game will start on the first click
    if(this.#state == WAITING_FIRST_MOVE) {
      console.log('Initializing game')
      this.initialize(row, col)
      this.#state = PLAYING
      return this.#board[row][col]
    }

    if(this.#state !== PLAYING) throw new GameNotInProgress()

    const cell = this.#board[row][col]
    this.#checkMine(cell)

    // TODO: if all cells are revealed, game is over

    return cell
  }

  // DEBUG: for reseting game while testing
  reset() {
    this.#initialize()
  }

}

export default Game
