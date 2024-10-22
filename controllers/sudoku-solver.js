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

  checkRegionPlacement(puzzleString, row, column, value) {
    let startRow = Math.floor(row / 3) * 3;
    let startColumn = Math.floor(column / 3) * 3;
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startColumn; col < startColumn + 3; col++) {
        const index = row * 9 + col;
        if (puzzleString[index] === value) return false;
      }
    }
    return true;
  }

  checkPointPlacement(puzzleString, row, col, value) {
    const index = row * 9 + col;
    if (puzzleString[index] === value) return true;
    return false;
  }

  solve(puzzleString) {
    const validationResult = this.validate(puzzleString);
    if (validationResult !== true) return validationResult;
    const sudokuArray = puzzleString.split("");

    const solveHelper = (array) => {
      for (let index = 0; index < array.length; index++) {
        if (array[index] === ".") {
          let row = Math.floor(index / 9);
          let col = index % 9;
          for (let i = 1; i <= 9; i++) {
            let value = i.toString();
            if (
              this.checkRowPlacement(array.join(""), row, value) === true &&
              this.checkColPlacement(array.join(""), col, value) === true &&
              this.checkRegionPlacement(array.join(""), row, col, value) ===
                true
            ) {
              array[index] = value;
              if (solveHelper(array)) {
                return true;
              }
              array[index] = ".";
            }
          }
          return false;
        }
      }
      return true;
    };

    const solved = solveHelper(sudokuArray);

    if (solved) {
      return sudokuArray.join("");
    }
    return { error: "Puzzle cannot be solved" };
  }
}

module.exports = SudokuSolver;
