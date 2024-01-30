const DEFAULT_ID_LENGTH = 5

function randomId(length = DEFAULT_ID_LENGTH) {
  const validChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let randomId = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length)
    randomId += validChars.charAt(randomIndex)
  }

  return randomId
}

export default randomId
