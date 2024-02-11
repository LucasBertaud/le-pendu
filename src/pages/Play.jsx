import React, { useState, useEffect, useContext } from 'react'
import { PlayContext } from '../main'
import congratulation from '../scripts/congratulation.js';
import replace from 'replace-special-characters';

function Play() {
  const [state, dispatch] = useContext(PlayContext);

  const fetchRandomWord = () => {
    fetch('https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json')
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          const randomWord = data[Math.floor(Math.random() * data.length)].toUpperCase();
          const randomWordWithoutSpecial = replace(randomWord);
          if (randomWordWithoutSpecial.includes("-")) {
            dispatch({ type: "GLETTERS", value: [...state.guessedLetters, "-"] });
          }
          console.log(`word : ${randomWord}`) // Affiche le mot aléatoire dans la console
          dispatch({ type: "WORD", value: randomWordWithoutSpecial });
        }
      })
  }

  useEffect(() => {
    fetchRandomWord();
    window.addEventListener("keyup", (e) => {
      if (document.activeElement !== document.querySelector(".game__text")) {
        mockClick(e.key.toUpperCase());
      }
    });
  }, [])

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const normalizeLetter = (letter) => {
    return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  }

  const handleNameChange = event => {
    dispatch({ type: "WNAME", value: event.target.value })
  }

  const hangmanSteps = [
    '../../../public/base.svg',
    '../../../public/etape1.svg',
    '../../../public/etape2.svg',
    '../../../public/etape3.svg',
    '../../../public/etape4.svg',
    '../../../public/etape5.svg',
    '../../../public/etape6.svg',
    '../../../public/etape7.svg'
  ]

  const mockClick = (letter) => {
    if (alphabet.includes(letter)) {
      document.querySelector(`#${letter}`).click();
    }
  }

  const handleLetter = (letter) => {
    if (alphabet.includes(letter)) {
      dispatch({ type: "GLETTERS", value: [...state.guessedLetters, letter] });
      if (!state.word.split('').map(normalizeLetter).includes(letter)) {
        dispatch({ type: "WGUESS", value: state.wrongGuesses + 1 })
        if (state.wrongGuesses + 1 > hangmanSteps.length - 1) {
          dispatch({ type: "GOVER", value: true })
        }
      } else {
        // Ajoute 2 points pour une bonne supposition
        dispatch({ type: "SCORE", value: state.score + 2 })
      }
    }
  }

  useEffect(() => {
    if (state.word != "null" || state.word != null) {
      if (state.word.split('').map(normalizeLetter).every(letter => state.guessedLetters.includes(letter))) {
        dispatch({ type: "GWIN", value: true });
      }
    }
  }, [state.guessedLetters, state.word])

  useEffect(() => {
    if (state.gameWin) {
      $("body").addClass("winning");
      const congrats = new congratulation();
      congrats.start();
      $(".nav__item a").each((i, e) => {
        $(e).on("click", () => {
          if (!$(e).hasClass("active")) {
            $("body").removeClass("winning");
          }
        });
      });
    }
  }, [state.gameWin])

  const handleGuessSubmit = () => {
    // dispatch({ type: "BUTTON_CLICKED", value: true });
    if (state.playerGuess.toUpperCase() === state.word) {
      const remainingLetters = state.word.split('').filter(letter => !state.guessedLetters.includes(letter)).length
      // Ajoute 2 points + 1 point par lettre restante pour une bonne supposition
      dispatch({ type: "SCORE", value: state.score + 2 + remainingLetters })
      dispatch({ type: "GWIN", value: true });
    } else if (state.playerGuess.toUpperCase() !== state.word && state.playerGuess !== '') {
      // Soustrait 2 points pour une mauvaise supposition
      dispatch({ type: "SCORE", value: state.score - 2 })
    }
    dispatch({ type: "PGUESS", value: '' });
  }

  const handleEndGame = () => {
    // Save the current score before reloading the page
    localStorage.setItem('currentScore', state.score);
    window.location.reload();
  }

  useEffect(() => {
    // Get the saved score and set it as the initial score
    const savedScore = localStorage.getItem('currentScore');
    if (savedScore) {
      dispatch({ type: "SCORE", value: parseInt(savedScore) });
    }
    fetchRandomWord();
    window.addEventListener("keyup", (e) => {
      if (document.activeElement !== document.querySelector(".game__text")) {
        mockClick(e.key.toUpperCase());
      }
    });
  }, [])

  const handleRetry = () => {
    window.location.reload();
  }

  const handleSave = () => {
    const scoreData = JSON.parse(localStorage.getItem('score'));
    if (scoreData != null) {
      console.log(scoreData);
      localStorage.setItem('score', JSON.stringify([
        ...scoreData,
        { name: state.winnerName, score: state.score }
      ]));
    }
    else {
      localStorage.setItem('score', JSON.stringify([
        { name: state.winnerName, score: state.score }
      ]));
    }
    // Reset the current score to 0
    localStorage.setItem('currentScore', 0);
    window.location.reload();
  }

  return (
    <>
      {
        !state.gameWin && !state.gameOver ?
          (
            <div className="game">
              <h1 className="game__title">Le Pendu</h1>
              <div id="alphabet" className="game__alphabet">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleLetter(letter)}
                    disabled={state.guessedLetters.includes(letter)}
                    id={letter}
                    className="game__letter"
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <p className="game__word">
                Mot: {state.word.split('').map(letter => (state.guessedLetters.includes(normalizeLetter(letter)) ? normalizeLetter(letter) : '_')).join(' ')}
              </p>
              {state.wrongGuesses > 0 && (
                <img style={{ width: '250px', height: '300px', padding: '10px' }} src={hangmanSteps[state.wrongGuesses]} alt="Hangman" className="game__image" />
              )}
              <p className="game__score">Score: {state.score}</p>
              <input type="text" value={state.playerGuess} onChange={e =>
                dispatch({ type: "PGUESS", value: e.target.value })} className="game__text" />
              <button onClick={handleGuessSubmit} className="game__submit">Soumettre une supposition</button>
            </div>
          )
          : state.gameWin && !state.gameOver ?
            (
              <>
                <div className="congrats">
                  <h1 className='congrath1'>Congratulations!</h1>
                </div>
                <div className="game__center">
                  <p className="game__score">Score: {state.score}</p>
                  <input type="text" className='game__input' value={state.winnerName} onChange={handleNameChange} placeholder="Entrez votre nom" />
                  <button className='game__button' onClick={handleEndGame}>Recommencer</button>
                  <button id="savebutton" className='game__button' onClick={handleSave}>Sauvegarder</button>
                </div>
              </>
            ) : !state.gameWin && state.gameOver ?
              (
                <>
                  <div className="game__over">
                    <p>Vous avez perdu.</p>
                    <p>Votre score : {state.score}</p>
                    <button onClick={handleRetry}>Retenter</button>
                  </div>
                </>
              ) : null
      }
    </>
  )
}

export default Play