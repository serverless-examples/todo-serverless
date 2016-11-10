'use strict';

const uuid = require('uuid')

const data = {};

const includeItem = (completed, status) => {
  switch(status) {
    case 'ACTIVE':
      return !completed;
    case 'COMPLETED':
      return completed;
    case 'ANY':
      return true;
  }
}

const getTodos = (args) => {
  console.log('Getting todos: ', args);

  const list = [];
  Object.keys(data).forEach(key => {
    const todo = data[key];

    if(includeItem(todo.completed, args.status)) {
      list.push(todo);
    }
  });

  return list;
}

const addTodo = (args) => {
  console.log('Adding todo: ', args);
  const id = uuid.v4();
  const todo = {
    id: id,
    name: args.name,
    completed: false
  };

  data[id] = todo;

  return todo;
}

const setTodoCompleted = (args) => {
  console.log('Setting todo completed: ', args);

  const id = args.id;

  const todo = data[id];

  if(todo) {
    todo.completed = args.completed;
  }

  return todo;
}

module.exports = {
  getTodos,
  addTodo,
  setTodoCompleted,
};
