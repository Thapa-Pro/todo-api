const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authorizeKey = require("../middleware/authorizeKey");
const authorizeUser = require("../middleware/authorizeUser");

// 🔐 Apply API key middleware to all routes
router.use(authorizeKey);

// 🟢 Public routes (no login needed)
router.get("/", todoController.getAllTodos);
router.get("/:userId", todoController.getTodosByUserId);

// 🔒 Protected routes (login required)
router.post("/", authorizeUser, todoController.createTodo);
router.put("/:todoId", authorizeUser, todoController.toggleTodoDone);
router.delete("/:todoId", authorizeUser, todoController.deleteTodo);

module.exports = router;
