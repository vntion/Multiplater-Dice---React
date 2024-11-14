import { useState } from 'react';

import dice1 from '../img/dice-1.png';
import dice2 from '../img/dice-2.png';
import dice3 from '../img/dice-3.png';
import dice4 from '../img/dice-4.png';
import dice5 from '../img/dice-5.png';
import dice6 from '../img/dice-6.png';
import Section from './Section';
import Button from './Button';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [players, setPlayers] = useState([
    { score: 0, playing: true, win: false },
    { score: 0, playing: false, win: false },
  ]);
  const [currScore, setCurrScore] = useState(0);
  const [dice, setDice] = useState(null);

  const handleNewGame = function () {
    setPlayers([
      { score: 0, playing: true, win: false },
      { score: 0, playing: false, win: false },
    ]);
    setCurrScore(0);
    setDice(null);
  };

  const handleRollDice = function () {
    if (!isPlaying) return;

    const randomDice = Math.trunc(Math.random() * 6) + 1;

    if (randomDice !== 1) {
      setDice(diceImages[randomDice - 1]);
      setCurrScore(currScore => currScore + randomDice);
    } else {
      setDice(diceImages[randomDice - 1]);
      setCurrScore(0);
      setPlayers(players =>
        players.map(player => {
          return { ...player, playing: !player.playing };
        })
      );
    }
  };

  const handleHoldDice = function () {
    if (!isPlaying) return;

    // Pertama, tambahkan skor current ke pemain yang sedang bermain
    setPlayers(players =>
      players.map(player =>
        player.playing ? { ...player, score: player.score + currScore } : player
      )
    );

    // Tunggu sampai state pemain diperbarui, lalu cek kondisi kemenangan
    setTimeout(() => {
      const updatedPlayers = players.map(player => ({
        ...player,
        score: player.playing ? player.score + currScore : player.score,
      }));

      const winner = updatedPlayers.find(player => player.score >= 20);
      if (winner) {
        // Jika ada pemenang, hentikan permainan dan tandai pemenang
        setPlayers(players =>
          players.map(player =>
            player.score >= 20
              ? { ...player, playing: false, win: true }
              : player
          )
        );
        setDice(null);
        setCurrScore(0);
      } else {
        // Jika tidak ada pemenang, lanjutkan permainan
        setCurrScore(0);
        setPlayers(players =>
          players.map(player => {
            return { ...player, playing: !player.playing };
          })
        );
      }
    }, 0);
  };

  const isPlaying = players.some(player => player.win) ? false : true;
  const showDice = dice === null ? 'hidden' : '';

  return (
    <main>
      <Section
        className={
          players[0].win
            ? 'player--winner'
            : players[0].playing
            ? 'player--active'
            : ''
        }
        player={'player 1'}
        score={players[0].score}
        currScore={players[0].playing ? currScore : 0}
      />
      <Section
        className={
          players[1].win
            ? 'player--winner'
            : players[1].playing
            ? 'player--active'
            : ''
        }
        player={'player 2'}
        score={players[1].score}
        currScore={players[1].playing ? currScore : 0}
      />

      <img src={dice} alt="Playing dice" className={`dice ${showDice}`} />

      <Button className={'btn--new'} onClick={handleNewGame}>
        🔄 New game
      </Button>
      <Button className={'btn--roll'} onClick={handleRollDice}>
        🎲 Roll dice
      </Button>
      <Button className={'btn--hold'} onClick={handleHoldDice}>
        📥 Hold
      </Button>
    </main>
  );
}

export default App;
