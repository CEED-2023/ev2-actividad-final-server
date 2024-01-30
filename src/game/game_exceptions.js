class GameError extends Error { }

class GameNotInProgress extends GameError {
  constructor() { super('Game not in progress') }
}

export {
  GameError,
  GameNotInProgress
}
