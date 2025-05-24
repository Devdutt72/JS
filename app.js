let myPoints = 0
let computerPoints = 0
let gameDone = false
let roundsPlayed = 0

const options = document.querySelectorAll(".choice")
const gameMessage = document.querySelector("#game-message")
const myPointsDisplay = document.querySelector("#my-points")
const computerPointsDisplay = document.querySelector("#computer-points")
const versusSection = document.querySelector(".versus")
const endButton = document.querySelector("#end-game")
const finalMessage = document.querySelector("#final-message")
const startButton = document.querySelector("#start-again")

function pickComputerMove() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
}

function showMoves(myMove, computerMove) {
  versusSection.classList.add("show")
  document.querySelectorAll("#my-move img").forEach(img => {
    img.classList.toggle("hidden", !img.classList.contains(`my-${myMove}`))
  })
  document.querySelectorAll("#computer-move img").forEach(img => {
    img.classList.toggle("hidden", !img.classList.contains(`computer-${computerMove}`))
  })
}

function hideUnusedMove(myMove, computerMove) {
  const unusedMove = ["rock", "paper", "scissors"].find(move => move !== myMove && move !== computerMove)
  options.forEach(option => {
    option.classList.toggle("hidden", option.id === unusedMove)
  })
}

function decideWinner(myMove, computerMove) {
  if (myMove === computerMove) {
    gameMessage.textContent = "It's a tie!"
    gameMessage.style.background = "#1a2a44"
    return
  }

  const wins = { rock: "scissor", paper: "rock", scissors: "paper" }
  if (wins[myMove] === computerMove) {
    myPoints++
    myPointsDisplay.textContent = myPoints
    gameMessage.textContent = `You win! ${myMove} beats ${computerMove}`
    gameMessage.style.background = "green"
  } else {
    computerPoints++
    computerPointsDisplay.textContent = computerPoints
    gameMessage.textContent = `Computer wins! ${computerMove} beats ${myMove}`
    gameMessage.style.background = "red"
  }
}

function resetGame() {
  options.forEach(option => option.classList.remove("hidden"))
  versusSection.classList.remove("show")
  gameMessage.textContent = "Choose your move!"
  gameMessage.style.background = "#1a2a44"
}

function playRound(myMove) {
  if (gameDone) return

  const computerMove = pickComputerMove()
  showMoves(myMove, computerMove)
  hideUnusedMove(myMove, computerMove)
  decideWinner(myMove, computerMove)

  roundsPlayed++
  if (roundsPlayed > 0) {
    endButton.classList.remove("hidden")
  }

  setTimeout(() => {
    if (gameDone) return
    resetGame()
  }, 2000)
}

function finishGame() {
  gameDone = true
  options.forEach(option => option.classList.add("hidden"))
  versusSection.classList.remove("show")
  gameMessage.classList.add("hidden")
  endButton.classList.add("hidden")

  const winner = myPoints > computerPoints ? "Player" : computerPoints > myPoints ? "Computer" : "It's a tie"
  const resultText = winner === "It's a tie" ? 
    "It's a tie! No winner this time." : 
    `Congratulations ${winner}!`
  finalMessage.textContent = `${resultText} Final Score: Player ${myPoints} - Computer ${computerPoints}`
  finalMessage.classList.remove("hidden")
  startButton.classList.remove("hidden")
}

function startNewGame() {
  myPoints = 0
  computerPoints = 0
  gameDone = false
  roundsPlayed = 0
  myPointsDisplay.textContent = "0"
  computerPointsDisplay.textContent = "0"
  options.forEach(option => option.classList.remove("hidden"))
  versusSection.classList.remove("show")
  gameMessage.textContent = "Choose your move!"
  gameMessage.style.background = "#1a2a44"
  gameMessage.classList.remove("hidden")
  finalMessage.classList.add("hidden")
  startButton.classList.add("hidden")
}

options.forEach(option => option.addEventListener("click", () => playRound(option.id)))
endButton.addEventListener("click", finishGame)
startButton.addEventListener("click", startNewGame)