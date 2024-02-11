import React from 'react'

function Home() {
  return (
    <div className="home">
      <h1 className="home__title">Bienvenue au jeu du pendu !</h1>
      <p className="home__intro">Voici les règles du jeu :</p>
      <ul className="home__rules">
        <li>Devinez une lettre pour essayer de deviner le mot.</li>
        <li>Si vous devinez incorrectement, une partie du pendu sera dessinée.</li>
        <li>Si le pendu entier est dessiné, vous perdez.</li>
        <li>Si vous devinez le mot avant que le pendu ne soit complet, vous gagnez !</li>
        <li className="home__history">Le jeu du pendu est un jeu de mots classique qui a été joué pendant des siècles. Il met à l'épreuve votre capacité à deviner des mots en fonction d'indices limités, et chaque mauvaise supposition vous rapproche un peu plus de la défaite. Mais ne vous inquiétez pas, avec de la pratique, vous pouvez devenir un maître du pendu !</li>
        <li className="home__tips">Conseil : essayez de deviner d'abord les voyelles, car elles apparaissent plus fréquemment dans les mots.</li>
      </ul>
    </div>
  )
}

export default Home