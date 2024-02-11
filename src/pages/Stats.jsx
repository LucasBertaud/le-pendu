import React, { useContext, useState, useEffect } from 'react'
import { PlayContext } from '../main'

function Stats() {
  const [state] = useContext(PlayContext);
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    const scoreData = JSON.parse(localStorage.getItem('score'));
    let arrayScore = [];
    if (scoreData != null) {
      scoreData.forEach((element, i) => {
          const sliceScore = scoreData.slice(i+1);
          if (scoreData.length > 1) {
            if (sliceScore.find(x => x.name.toLowerCase() == element.name.toLowerCase())) {
              var a = sliceScore.find(x => x.name.toLowerCase() == element.name.toLowerCase());
              a.score += element.score;
              return;
            }
          }
          arrayScore.push(element);
        });
  
        setWinners(arrayScore);
    }
  }, []);

  return (
    <div className="stats">
      <h1 className="stats__title">Statistiques</h1>
      {winners.map((winner, index) => (
        <div key={index} className="stats__winner">
          <p className="stats__name">Nom du gagnant : {winner.name.toLowerCase()}</p>
          <p className="stats__score">Score : {winner.score}</p>
        </div>
      ))}
    </div>
  )
}

export default Stats