"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const rowMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
};

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value)
      return res.json({ error: "Required field(s) missing" });

    const validatePuzzle = solver.validate(puzzle);
    if (validatePuzzle !== true) return res.json(validatePuzzle);

    const rowName = String(coordinate.match(/^[A-G](?=[1-9])/));
    const colNumber = Number(coordinate.match(/(?<=[A-G])[1-9]$/));
    const correctValue = String(value.match(/^[1-9]$/));

    if (correctValue === "null") return res.json({ error: "Invalid value" });

    if (!rowName || !colNumber)
      return res.json({ error: "Invalid coordinate" });

    const row = rowMap[rowName];
    const col = colNumber - 1;

    if (solver.checkPointPlacement(puzzle, row, col, correctValue) === true)
      return res.json({ valid: true });

    const conflicts = [];

    const checkRowPlacement = solver.checkRowPlacement(
      puzzle,
      row,
      correctValue
    );
    if (checkRowPlacement === false) conflicts.push("row");

    const checkColPlacement = solver.checkColPlacement(
      puzzle,
      col,
      correctValue
    );
    if (checkColPlacement === false) conflicts.push("column");

    const checkRegionPlacement = solver.checkRegionPlacement(
      puzzle,
      row,
      col,
      correctValue
    );
    if (checkRegionPlacement === false) conflicts.push("region");

    if (conflicts.length > 0) {
      return res.json({ valid: false, conflict: conflicts });
    }
    return res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const puzzleString = req.body.puzzle;
    const solvePuzzle = solver.solve(puzzleString);
    if (typeof solvePuzzle === "object" && solvePuzzle.error)
      return res.json(solvePuzzle);
    res.json({ solution: solvePuzzle });
  });
};
