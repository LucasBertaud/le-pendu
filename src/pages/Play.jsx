import React, { useState, useEffect, useContext } from 'react'
import { PlayContext } from '../main'

function Play() {

  const [state, dispatch] = useContext(PlayContext);

  useEffect(() => {
    fetchRandomWord()
  }, [])

  const fetchRandomWord = () => {
    fetch('https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json')
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          const randomWord = data[Math.floor(Math.random() * data.length)].toUpperCase()
          console.log(`word : ${randomWord}`) // Affiche le mot aléatoire dans la console
          dispatch({ type: "WORD", value: randomWord });
        }
      })
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const handleNameChange = event => {
    dispatch({ type: "WNAME", value: event.target.value })
  }

  const hangmanSteps = [
    '',
    '../../../public/base.svg',
    '../../../public/etape1.svg',
    '../../../public/etape2.svg',
    '../../../public/etape3.svg',
    '../../../public/etape4.svg',
    '../../../public/etape5.svg',
    '../../../public/etape6.svg',
    '../../../public/etape7.svg'
  ]

  const handleLetterClick = letter => {
    dispatch({ type: "GLETTERS", value: [...state.guessedLetters, letter] });
    if (!state.word.includes(letter)) {
      dispatch({ type: "WGUESS", value: state.wrongGuesses + 1 })
      if (state.wrongGuesses + 1 > hangmanSteps.length - 1) {
        dispatch({ type: "GOVER", value: true })
      }
    } else {
      // Ajoute 2 points pour une bonne supposition
      dispatch({ type: "SCORE", value: state.score + 2 })
    }
  }

  const handleGuessSubmit = () => {
    dispatch({ type: "BUTTON_CLICKED", value: true });
    if (state.playerGuess.toUpperCase() === state.word) {
      const remainingLetters = state.word.split('').filter(letter => !state.guessedLetters.includes(letter)).length
      // Ajoute 2 points + 1 point par lettre restante pour une bonne supposition
      dispatch({ type: "SCORE", value: state.score + 2 + remainingLetters })
      startNewGame()
    } else {
      // Soustrait 2 points pour une mauvaise supposition
      dispatch({ type: "SCORE", value: state.score - 2 })
    }
    dispatch({ type: "PGUESS", value: '' });
  }

  const handleEndGame = () => {
    dispatch({ type: "BUTTON_CLICKED", value: false });
    localStorage.setItem('score', state.score);
    dispatch({ type: "GOVER", value: true });
    window.location.reload();
  }

  useEffect(() => {
    // Récupérer le score du stockage local lorsque la page est rechargée
    const score = localStorage.getItem('score');
    if (score) {
      dispatch({ type: "SCORE", value: parseInt(score, 10) });
      // Supprimer le score du stockage local
      localStorage.removeItem('score');
    }
  }, []);

  useEffect(() => {
    if (state.word.split('').every(letter => state.guessedLetters.includes(letter))) {
      dispatch({ type: "GOVER", value: true })
    }
  }, [state.guessedLetters, state.word])

  useEffect(() => {
    if (state.gameOver && state.wrongGuesses > hangmanSteps.length - 1) {
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }, [state.gameOver, state.wrongGuesses, hangmanSteps])

  return (
    <div>
      <h1>Le Pendu</h1>
      {alphabet.map(letter => (
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          disabled={state.guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
      <p>
        Mot: {state.word.split('').map(letter => (state.guessedLetters.includes(letter) ? letter : '_')).join(' ')}
      </p>
      <img style={{ width: '250px', height: '300px', padding: '10px' }} src={hangmanSteps[state.wrongGuesses]} alt="Hangman" />
      <p>Score: {state.score}</p>
      <input type="text" value={state.playerGuess} onChange={e =>
        dispatch({ type: "PGUESS", value: e.target.value })} />
      <button onClick={handleGuessSubmit}>Submit Guess</button>
      {state.gameOver && state.isButtonClicked && (state.word.split('').every(letter => state.guessedLetters.includes(letter)) || state.playerGuess.toUpperCase() === state.word) && (
        <div>
          <p>Vous avez gagné!</p>
          <input type="text" value={state.winnerName} onChange={handleNameChange} placeholder="Entrez votre nom" />
          <button onClick={handleEndGame}>End Game</button>
        </div>
      )}
      {state.gameOver && state.wrongGuesses > hangmanSteps.length - 1 && (
        <p>Vous avez perdu. La page se rechargera dans 5 secondes.</p>
      )}
    </div>
  )
}

export default Play