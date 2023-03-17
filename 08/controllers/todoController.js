const Todo = require('../models/todoModel');
const { catchAsync } = require('../utils');

exports.createTodo = catchAsync(async (req, res) => {
  const newTodoData = {
    owner: req.user,
    title: req.body.title,
    desc: req.body.desc,
    due: req.body.due,
  };

  const newTodo = await Todo.create(newTodoData);

  res.status(201).json({
    todo: newTodo,
  });
});

exports.getTodosList = catchAsync(async (req, res) => {
  const { sort, order, page, limit, search } = req.query;

  const findOptions = search
    ? { $or: [{ title: { $regex: search, $options: 'i' } }, { desc: { $regex: search, $options: 'i' } }] }
    : {};
  const todosQuery = Todo.find(findOptions);

  // const todos = await Todo.find().sort(`${order === 'DESC' ? '-' : ''}${sort}`);
  todosQuery.sort(`${order === 'DESC' ? '-' : ''}${sort}`);

  // page 1 => skip 0
  // page 2 => skip 5
  // page 3 => skip 10
  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  // const todos = await Todo.find().skip(skip).limit(paginationLimit);
  todosQuery.skip(skip).limit(paginationLimit);

  const todosCount = await Todo.count(findOptions);
  const todos = await todosQuery.populate('owner');

  res.status(200).json({
    total: todosCount,
    todos,
  });
});
