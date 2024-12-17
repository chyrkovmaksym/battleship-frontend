export const mergeUpdatedBoard = (
  myBoard: string[][],
  updatedBoard: string[][]
): string[][] => {
  return myBoard.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const updatedCell = updatedBoard[rowIndex][colIndex];

      if (
        updatedCell.startsWith("H") ||
        updatedCell === "M" ||
        updatedCell === "K"
      ) {
        return updatedCell;
      }

      if (cell.startsWith("S")) {
        return cell;
      }

      return "";
    })
  );
};
