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

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
