export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p>{winner} WON !!</p> : <p>DRAW</p>}
      <p>
        <button onClick={onRestart}>RE-MATCH</button>
      </p>
    </div>
  );
}
