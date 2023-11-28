import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editValue) => !editValue);

    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  let playerNameField = (
    <span id="player_name" contentEditable={isEditing}>
      {playerName}
    </span>
  );

  if (isEditing) {
    playerNameField = (
      <input
        type="text"
        value={playerName}
        required
        onChange={handleChange}
      ></input>
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameField}
        <span id="player_mark">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
