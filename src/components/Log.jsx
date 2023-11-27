export default function Logs({ playerTurns }) {
  return (
    <ol id="logs">
      {playerTurns &&
        playerTurns.map((turn, key) => {
          const { square, player } = turn;
          const { row, col } = square;

          return (
              <li key = {key}>
                {player} selected {row+1}, {col+1}
              </li>
          );
        })}
    </ol>
  );
}
