module.exports = milliseconds => {
  // Hopefully there aren't any tests that are taking longer than an hour :)
  let minutes = Math.floor(milliseconds / 60000)
  let seconds = ((milliseconds % 60000) / 1000).toFixed(0)

  if (seconds === 60) {
    minutes++
    seconds = 0
  }

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
