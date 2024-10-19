const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const puzzleString1 =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

suite("Unit Tests", () => {
  suite("Unit Test for puzzle string validator logic", () => {
    test("Logic handles a valid puzzle string of 81 characters", (done) => {
      assert.isTrue(solver.validate(puzzleString1));
      done();
    });
    test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
      const puzzleString2 = "14324324";
      assert.equal(
        solver.validate(puzzleString2).error,
        "Expected puzzle to be 81 characters long"
      );
      done();
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
      const puzzleString2 =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8.-1..16....926914.37.";

      assert.equal(
        solver.validate(puzzleString2).error,
        "Invalid characters in puzzle"
      );
      done();
    });
  });

  suite("Unit Test for row placement checking logic", () => {
    test("Logic handles a valid row placement", (done) => {
      assert.equal(solver.checkRowPlacement(puzzleString1, 8, 5), true);
      done();
    });
    test("Logic handles an invalid row placement", (done) => {
      assert.equal(solver.checkRowPlacement(puzzleString1, 0, 5), false);
      done();
    });
  });

  suite("Unit Test for column placement checking logic", () => {
    test("Logic handles a valid column placement", (done) => {
      assert.equal(solver.checkColPlacement(puzzleString1, 7, 1), true);
      done();
    });
    test("Logic handles an invalid column placement", (done) => {
      assert.equal(solver.checkColPlacement(puzzleString1, 0, 1), false);
      done();
    });
  });

  suite("Unit Test for region placement checking logic", () => {
    test("Logic handles a valid region (3x3 grid) placement", (done) => {
      assert.equal(solver.checkRegionPlacement(puzzleString1, 2, 2, "7"), true);
      done();
    });

    test("Logic handles a valid region (3x3 grid) placement", (done) => {
      assert.equal(
        solver.checkRegionPlacement(puzzleString1, 2, 2, "5"),
        false
      );
      done();
    });
  });
});
