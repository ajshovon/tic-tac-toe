import type React from 'react';

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="w-20 h-20 bg-purple-100 border-2 border-purple-300 text-4xl font-bold flex items-center justify-center rounded-lg hover:bg-purple-200 transition duration-300 ease-in-out transform hover:scale-105" onClick={onSquareClick}>
      <span className={value === 'X' ? 'text-pink-500' : 'text-blue-500'}>{value}</span>
    </button>
  );
};

export default Square;
