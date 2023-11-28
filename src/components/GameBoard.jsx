export default function GameBoard({ board, setActivePlayerChange }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleClick(rowIndex,colIndex){
  //     setGameBoard((prevGameBoard)=>{
  //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
  //         updatedGameBoard[rowIndex][colIndex] = activePlayerMarker;
  //         return updatedGameBoard;
  //     })

  //     setActivePlayerChange();
  // }

  return (
    <ol id="gameBoard">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
              return (
                <li key={colIndex}>
                  <button
                    onClick={() => setActivePlayerChange(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
