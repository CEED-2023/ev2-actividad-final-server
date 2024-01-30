const MINE_CHARACTER = 'M'

function placeMines(board, numMines, firstClickPosition) {
  const height = board.height
  const width = board.width

  let minesToPlace = numMines

  // This could go into an infinite loop if numMines > height * width
  while (minesToPlace > 0) {
    const randomRow = Math.floor(Math.random() * height)
    const randomCol = Math.floor(Math.random() * width)

    // Ensure the first click position and its neighbors are safe
    const isSafe =
      Math.abs(randomRow - firstClickPosition[0]) > 1 ||
      Math.abs(randomCol - firstClickPosition[1]) > 1

    if (isSafe && board[randomRow][randomCol] !== MINE_CHARACTER) {
      board[randomRow][randomCol] = MINE_CHARACTER
      minesToPlace--
    }
  }

  return board
}


// Helper function to check if the given coordinates are within the board boundaries
function isValid(row, col, board) {
  return row >= 0 && row < board.height && col >= 0 && col < board.width
}

function surroundingMines(board, row, col) {
    // Define the eight possible directions around a cell
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1]
    ]

    // Count the number of mines in the surrounding cells
    let mineCount = 0
    for (const [dx, dy] of directions) {
      const newRow = row + dx
      const newCol = col + dy

      if (isValid(newRow, newCol, board) && board[newRow][newCol] === MINE_CHARACTER) {
        mineCount++
      }
    }

    return mineCount
}

function fillNumbers(board) {
  const height = board.length
  const width = board[0].length

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (board[row][col] === MINE_CHARACTER) continue

      board[row][col] = surroundingMines(board, row, col)
    }
  }
}

function initializeMinesweeper(height, width, numMines, firstClickPosition) {
  if(numMines > height * width) throw new Error('Too many mines')

  const board = Array.from({ length: height }, () => Array(width).fill(0))

  // We give a heiht and width to the board
  board.height = height
  board.width = width

  placeMines(board, numMines, firstClickPosition)
  fillNumbers(board)
  return board
}


export {
  MINE_CHARACTER,
  initializeMinesweeper
}
