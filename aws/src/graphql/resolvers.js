'use strict';

const uuid = require('uuid')

const data = [];

const getTodos = (args) => {
  console.log('Getting todos: ', args);
  const status = args.status;

  if(status === 'ANY') {
    return data;
  }

  const completed = status === 'COMPLETED';

  return data.filter(todo => todo.completed === completed);
}

const addTodo = (args) => {
  const todo = {
    id: uuid.v4(),
    name: args.name,
    completed: false
  };
  data.push(todo);
  return todo;
}

const setTodoCompleted = (args) => {
  const id = args.id;
  const completed = args.completed;

  const todo = {
    id: uuid.v4(),
    name: args.name,
    completed: false
  };
  data.push(todo);
  return todo;
}

module.exports = {
  getTodos,
  addTodo,
  setTodoCompleted,
};
