export const initialState = {
    word: 'null',
    guessedLetters: [],
    wrongGuesses: 0,
    gameOver: false,
    gameWin: false,
    winnerName: '',
    score: 0,
    playerGuess: '',
    isButtonClicked: false,
    winners: [],
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
        case "GWIN":
            return { ...state, gameWin: action.value }
        case "SCORE":
            return { ...state, score: action.value }
        case "GLETTERS":
            return { ...state, guessedLetters: action.value }
        case "BUTTON_CLICKED":
            return { ...state, isButtonClicked: action.value }
        case "ADD_WINNER":
            return { ...state, winners: [...state.winners, action.value] }
        case "STATE_GAME":
            return { ...state, stateGame: action.value}
        default:
            break;
    }
}