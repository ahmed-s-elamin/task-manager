const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

//gettin all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//creating a todo
router.post("/new", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleting a todo
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//completing
router.get("/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
