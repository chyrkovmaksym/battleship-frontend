import React from "react";

interface Props {
  field: string[][];
}

const GameField = ({ field }: Props) => {
  return (
    <div className="p-4 bg-blue-50 border border-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-10 gap-1">
        {field.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-9 w-9 flex items-center justify-center border rounded-lg ${
                  cell === "" ? "bg-gray-200" : "bg-green-400"
                } text-xs font-bold text-gray-900 hover:bg-green-300`}
              >
                {cell}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GameField;
