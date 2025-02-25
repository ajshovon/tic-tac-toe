import type React from 'react';
import { useState } from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const resetGame = () => {
    setHistory([Array(9).fill('')]);
    setCurrentMove(0);
    setXIsNext(true);
  };

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className="mb-2">
        <button className="px-3 py-2 text-sm bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 font-sans">
      <h1 className="text-5xl font-bold mb-8 text-purple-600 animate-pulse">Tic Tac Toe</h1>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
        <div className="game-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Game History</h2>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default App;
