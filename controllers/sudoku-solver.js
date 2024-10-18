class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return { error: "Required field missing" };
    if (puzzleString.length !== 81)
      return { error: "Expected puzzle to be 81 characters long" };
    const puzzlePattern = /^[1-9.]{81}$/;
    const result = puzzlePattern.test(puzzleString);
    if (!result) return { error: "Invalid characters in puzzle" };
    return result;
  }

  checkRowPlacement(puzzleString, row, value) {
    let startIndex = row * 9;
    let endIndex = startIndex + 9;
    let rowString = puzzleString.slice(startIndex, endIndex);
    if (rowString.includes(value)) return false;
    return true;
  }

  checkColPlacement(puzzleString, column, value) {
    let startIndex = 0;
    let slicedStrings = [];
    for (let i = 9; i <= puzzleString.length; i += 9) {
      slicedStrings.push(puzzleString.slice(startIndex, i));
      startIndex = i;
    }
    let columnString = "";
    slicedStrings.map((string) => (columnString += string[column]));
    if (columnString.includes(value)) return false;
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
