const express = require("express");
const serverless = require("serverless-http");
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 3003;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());

let counter = 0;
let todos = [];

app.get("/todos", function (req, res) {
  res.status(200).json(todos);
});

app.post("/todos", function (req, res) {
  const todo = { id: counter, ...req.body };
  counter++;
  todos.push(todo);
  return res.status(201).json(todo);
});

app.delete("/todos/:id", function (req, res) {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.status(200).end();
});

app.put("/todos/:id", function (req, res) {
  todos = todos.map((t) => {
    if (t.id == req.params.id) {
      return { ...t, done: !t.done };
    }
    return t;
  });
  const todo = todos.filter((t) => t.id == req.params.id);
  todo.length ? res.status(201).json(todo[0]) : res.status(400);
});

if (process.env.ENVIRONMENT === "production") {
  module.exports.handler = serverless(app);
} else {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
