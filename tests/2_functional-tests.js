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

  suite(
    "POST /api/check given valid value with valid row and column => responds with its correct placement status",
    () => {
      test("Check a puzzle placement with all fields", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "3",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.isTrue(res.body.valid, "it should give a valid response");
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with single placement conflict", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "9",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.isFalse(res.body.valid, "it should give a invalid response");
            assert.equal(res.body.conflict.length, 1);
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with multiple placement conflict", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "5",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.isFalse(res.body.valid, "it should give a invalid response");
            assert.isAbove(res.body.conflict.length, 1);
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with all placement conflicts", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "2",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.isFalse(res.body.valid, "it should give a invalid response");
            assert.equal(res.body.conflict.length, 3);
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with missing required fields", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            coordinate: "A2",
            value: "2",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with invalid characters", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle:
              "1-5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
            coordinate: "A2",
            value: "2",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with incorrect length", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: "14.37.",
            coordinate: "A2",
            value: "2",
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
      test("Check a puzzle placement with invalid placement coordinate", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "a2",
            value: "2",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Invalid coordinate");
            done();
          });
        //last bracket of the test below
      });
      test("Check a puzzle placement with invalid placement value", (done) => {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "a",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);

            assert.isObject(res.body, "response should be an object");
            assert.equal(res.body.error, "Invalid value");
            done();
          });
        //last bracket of the test below
      });
    }
  );
});
