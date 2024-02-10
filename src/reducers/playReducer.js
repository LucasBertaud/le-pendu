export const initialState = {
    word: '',
    guessedLetters: [],
    wrongGuesses: 0,
    gameOver: false,
    winnerName: '',
    score: 0,
    playerGuess: '',
    isButtonClicked: false
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "WORD":
            return { ...state, word: action.value }
        case "WNAME":
            return { ...state, winnerName: action.value }
        case "PGUESS":
            return { ...state, playerGuess: action.value }
        case "WGUESS":
            return { ...state, wrongGuesses: action.value }
        case "GOVER":
            return { ...state, gameOver: action.value }
        case "SCORE":
            return { ...state, score: action.value }
        case "GLETTERS":
            return { ...state, guessedLetters: action.value }
        case "BUTTON_CLICKED":
            return { ...state, isButtonClicked: action.value }
        default:
            break;
    }
}