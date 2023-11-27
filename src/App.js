import "./App.css";

import Header from "./components/Header/Header.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Logs from "./components/Log.jsx";
import { useState } from "react";

import { WINNING_COMBINATIONS } from "./winning-combination.js";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  // const [activePlayer,setActivePlayer] = useState('X');
  const [turns, setTurns] = useState([]);

  let winner = null;
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  const activePlayer = deriveActivePlayer(turns);

  function handleActivePlayerChange(rowIndex, colIndex) {
    // setActivePlayer((prevActivePlayer) => {return prevActivePlayer === 'X' ? 'O' : 'X' ;})

    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players">
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            />
          </ol>
          {winner && <p> You Win {winner} !!!</p>}
          <GameBoard
            board={gameBoard}
            setActivePlayerChange={handleActivePlayerChange}
          />
        </div>

        <Logs playerTurns={turns} />
      </main>
    </>
  );
}

export default App;
