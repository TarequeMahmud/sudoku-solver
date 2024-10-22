const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite(
    "POST /api/solve given unsolved valid sudoku puzzle => responds with solved puzzle",
    () => {
      test("Solve a puzzle with valid puzzle string", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
            done();
          });
        //last bracket of the test below
      });
      test("Solve a puzzle with missing puzzle string", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Required field missing");
            done();
          });
        //last bracket of the test below
      });
      test("Solve a puzzle with invalid characters", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .send({
            puzzle:
              "1-5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
          });
        //last bracket of the test below
      });
      test("Solve a puzzle with incorrect length", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .send({
            puzzle:
              "5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(
              res.body.error,
              "Expected puzzle to be 81 characters long"
            );
            done();
          });
        //last bracket of the test below
      });
      test("Solve a puzzle that cannot be solved", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .send({
            puzzle:
              "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Puzzle cannot be solved");
            done();
          });
        //last bracket of the test below
      });
    }
  );
  //suite ends
});
