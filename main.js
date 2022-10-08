const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBOS = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]]
// variable that has all our different cells
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
// if circleTurn == true its circle mark turn to play, if false its X turn
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

// Function to start the game and hover the correct marker in the first move
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) // will remove the markers when the function is called
        cell.classList.remove(CIRCLE_CLASS) // will remove the markers when the function is called
        cell.removeEventListener('click', handleClick) // will remove the event when the function is called
        cell.addEventListener('click', handleClick, {once: true}) // add an event in each cell for when its clicked will fire this handleClick function onle once
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show') // remove the win/draw display when clicking on Restart
}

function handleClick(e) {
    const cell = e.target // whatever we clicked on, every cell we click its gonna be in cell variable 
    //current class variable is a way to know who is playing
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS // its circleTurn? if so return circle_class, otherwise return x class
    // place mark function allow us to place the mark correspondent to the actual turn in the clicked cell
    placeMark(cell, currentClass)
    // Check for Win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        // Switch Turns
        swapTurns()
        setBoardHoverClass()
    }
    // Switch Turns
    swapTurns()
    setBoardHoverClass()
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Its a Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's" } Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() { // ... allows to unpack values from arrays, in this case the cell value 
    return [...cellElements].every(cell => { // checks if every single cell as any x or o class, and want to return true because its a draw
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

// Fucntion to place marker in the desired cell
function placeMark(cell, currentClass) {
    // here we go to the cell and through the styling made on classList add it to the currentClass to display that style
    cell.classList.add(currentClass)
}

// Function to swap markers turns
function swapTurns() {
    // in ever click circle turn its false then true then false then true, etc changing to its inverse value
    circleTurn = !circleTurn
}

// Function to see the hovered marker based on the current turn
function setBoardHoverClass() {
    board.classList.remove(X_CLASS) // remove the x class if it was the previous marker
    board.classList.remove(CIRCLE_CLASS) // remove the circle class if it was the previous marker
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

// Function to check if Win
// it will check cells by its index and allways search for one of those combinations specially if its checked with the same markers
function checkWin(currentClass) {
    return WINNING_COMBOS.some(combination => { // some its to see if occurs any combination element from the ones inside array
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}