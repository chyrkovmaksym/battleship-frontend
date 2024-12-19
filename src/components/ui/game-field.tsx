import React from "react";

interface Props {
  field: string[][];
  isPlayerBoard: boolean;
  onCellClick?: (x: number, y: number) => void;
}

const getCellStyles = (cell: string) => {
  if (cell === "") {
    return "bg-gray-200"; // Empty cell style
  } else if (cell === "M") {
    return "bg-blue-200"; // Missed cell style
  } else if (cell.startsWith("S")) {
    return "bg-green-400"; // Ship cell style
  } else if (cell.startsWith("H")) {
    return "bg-red-400"; // Hit cell style
  } else if (cell === "K") {
    return "bg-black"; // Killed cell style
  }

  return "bg-gray-200"; // Default to empty cell style
};

const GameField = ({ field, isPlayerBoard, onCellClick }: Props) => {
  const handleCellClick = (x: number, y: number) => {
    if (onCellClick && !isPlayerBoard) {
      onCellClick(x, y);
    }
  };

  return (
    <div className="p-4 bg-blue-50 border border-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-10 gap-1">
        {field.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`h-9 w-9 flex items-center justify-center border rounded-lg ${getCellStyles(
                  cell
                )} text-xs font-bold text-gray-900 cursor-pointer ${
                  !isPlayerBoard ? "hover:bg-green-300" : "cursor-default"
                }`}
                title={cell || "Empty"}
              >
                {cell !== "" &&
                cell !== "M" &&
                !cell.startsWith("H") &&
                cell !== "K" ? (
                  <span className="text-sm" />
                ) : null}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GameField;
