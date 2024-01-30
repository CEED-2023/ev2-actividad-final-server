class GameError extends Error { }

class GameAlreadyStarted extends GameError {
  constructor() { super('Game already started') }
 }
class PlayerNotFound extends GameError {
  constructor() { super('Player not found') }
}
class PlayerIsNotPlaying extends GameError {
  constructor() { super('Player is not playing') }
}
class PlayerAlreadyJoined extends GameError {
  constructor() { super('Player already joined') }
}
class GameNotInProgress extends GameError {
  constructor() { super('Game not in progress') }
}
class CellAlreadyPlayed extends GameError {
  constructor() { super('Cell already played') }
}
class MineTriggered extends GameError {
  constructor() { super('Mine triggered') }
}
class GameAbandoned extends GameError {
  constructor() { super('No more players left in game') }
}

export {
  GameError,
  GameAlreadyStarted,
  PlayerNotFound,
  PlayerIsNotPlaying,
  PlayerAlreadyJoined,
  GameNotInProgress,
  CellAlreadyPlayed,
  MineTriggered,
  GameAbandoned
}
