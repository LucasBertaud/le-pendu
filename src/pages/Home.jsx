import React from 'react'

function Home() {
  return (
    <div>
      <h1>Bienvenue au jeu du pendu !</h1>
      <p>Voici les règles du jeu :</p>
      <ul>
        <li>Devinez une lettre pour essayer de deviner le mot.</li>
        <li>Si vous devinez incorrectement, une partie du pendu sera dessinée.</li>
        <li>Si le pendu entier est dessiné, vous perdez.</li>
        <li>Si vous devinez le mot avant que le pendu ne soit complet, vous gagnez !</li>
      </ul>
    </div>
  )
}

export default Home