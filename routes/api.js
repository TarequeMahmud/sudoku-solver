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

  app.route("/api/check").post((req, res) => {});

  app.route("/api/solve").post((req, res) => {
    const puzzleString = req.body.puzzle;
    const solvePuzzle = solver.solve(puzzleString);
    if (typeof solvePuzzle === "object" && solvePuzzle.error)
      return res.json(solvePuzzle);
    res.json({ solution: solvePuzzle });
  });
};
