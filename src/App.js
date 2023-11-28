import "./App.css";

import Header from "./components/Header/Header.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Logs from "./components/Log.jsx";
import { useState } from "react";

import { WINNING_COMBINATIONS } from "./winning-combination.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // const [activePlayer,setActivePlayer] = useState('X');
  const [players, setPlayers] = useState(PLAYERS);

  const [turns, setTurns] = useState([]);
  const activePlayer = deriveActivePlayer(turns);

  const gameBoard = deriveGameBoard(turns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = turns.length === 9 && !winner;

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

  function handleRestart() {
    setTurns((prevArr) => []);
  }

  function handleNameChange(symbol, playerName) {
    setPlayers((prevPlayer) => ({ ...prevPlayer, [symbol]: playerName }));
  }

  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onNameChange={handleNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onNameChange={handleNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
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
