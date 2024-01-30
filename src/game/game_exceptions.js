class GameError extends Error { }

class GameNotInProgress extends GameError {
  constructor() { super('Game not in progress') }
}
class MineTriggered extends GameError {
  constructor() { super('Mine triggered') }
}

export {
  GameError,
  GameNotInProgress,
  MineTriggered,
}
