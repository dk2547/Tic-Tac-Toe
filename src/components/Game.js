// components/Game.js
import React, { useState } from 'react';
import Board from '../Board';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState(null);
  const [usernamesEntered, setUsernamesEntered] = useState(false);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] === 'X' ? playerX : playerO;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (!usernamesEntered || winner || board[index]) return; // Stop game if usernames not entered, winner is found, or cell is already filled
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winningPlayer = checkWinner(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('');
    setWinner(null);
    setUsernamesEntered(false); // Reset usernamesEntered state
  };

  const startGame = (nameX, nameO) => {
    setPlayerX(nameX);
    setPlayerO(nameO);
    setCurrentPlayer('X');
    setUsernamesEntered(true); // Set usernamesEntered to true when both usernames are entered
  };

  const getStatusMessage = () => {
    if (winner) {
      return `Player ${winner} wins!`;
    } else if (board.every(square => square)) {
      return "It's a draw!";
    } else if (!usernamesEntered) {
      return 'Please enter usernames to start playing'; // Prompt to enter usernames
    } else {
      return `Current Player: ${currentPlayer === 'X' ? playerX : playerO}`;
    }
  };

  return (
    <div className="Game">
      <h2>Game Board</h2>
      {usernamesEntered ? (
        <>
          <Board squares={board} onClick={handleClick} />
          <div className="Status">{getStatusMessage()}</div>
          {(winner || board.every(square => square)) && (
            <button onClick={handleNewGame}>Start New Game</button>
          )}
        </>
      ) : (
        <UserForm startGame={startGame} />
      )}
    </div>
  );
};

const UserForm = ({ startGame }) => {
  const [nameX, setNameX] = useState('');
  const [nameO, setNameO] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    startGame(nameX, nameO);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter username for Player X:
        <input type="text" value={nameX} onChange={(e) => setNameX(e.target.value)} required />
      </label>
      <label>
        Enter username for Player O:
        <input type="text" value={nameO} onChange={(e) => setNameO(e.target.value)} required />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default Game;
