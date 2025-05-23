const Todo = require("../models/todoModel");

//================ GET ALL TODOS ==================//
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, todos });
  } catch (err) {
    next(err);
  }
};

//============ GET TODOS BY USER ID ==============//
exports.getTodosByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    res.status(200).json({ success: true, todos });
  } catch (err) {
    next(err);
  }
};

//=============== CREATE A NEW TODO ==============//
exports.createTodo = async (req, res, next) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ success: false, message: "Task is required" });
    }

    const newTodo = new Todo({
      task,
      userId: global.user.userId,
    });

    await newTodo.save();

    res.status(201).json({ success: true, message: "✅ Todo created!", todo: newTodo });
  } catch (err) {
    next(err);
  }
};

//============== TOGGLE TODO STATUS ==============//
exports.toggleTodoDone = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    if (todo.userId !== global.user.userId) {
      return res.status(403).json({ success: false, message: "You can only update your own todos" });
    }

    todo.done = !todo.done;
    todo.updatedAt = new Date();

    await todo.save();

    res.status(200).json({ success: true, message: "✅ Todo updated", todo });
  } catch (err) {
    next(err);
  }
};

//================ DELETE A TODO =================//
exports.deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    if (todo.userId !== global.user.userId) {
      return res.status(403).json({ success: false, message: "You can only delete your own todos" });
    }

    await todo.deleteOne();

    res.status(200).json({ success: true, message: "🗑️ Todo deleted" });
  } catch (err) {
    next(err);
  }
};
