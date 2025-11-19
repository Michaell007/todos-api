const { todos, nextId } = require('../data/todos');

// GET /api/todos
const getAllTodos = (req, res) => {
  res.json(todos);
};

// GET /api/todos/:id
const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo non trouvé" });
  res.json(todo);
};

// POST /api/todos
const createTodo = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Le champ title est requis" });

  let nextId = 5

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PUT /api/todos/:id
const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo non trouvé" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

// DELETE /api/todos/:id
const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo non trouvé" });

  todos.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};