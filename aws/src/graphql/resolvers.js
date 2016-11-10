'use strict';

const BbPromise = require('bluebird');
const uuid = require('uuid');

const Todo = require('./data').Todo;

const mapItem = (item) => {
  const data = item.attrs;
  return {
    id: data.id,
    name: data.name,
    completed: data.completed,
  };
}


const mapItems = (items) => items.map(mapItem);

const getTodos = (args) => {
  console.log('Getting todos: ', args);

  const status = args.status;

  if(status === 'ANY') {
    return new BbPromise((resolve, reject) => {
      // Scan's are not good for real systems'
      Todo.scan().exec((err, result) => {
        console.log('Retieved items', err, result);
        if(err) reject(err);
        else resolve(mapItems(result.Items));
      });
    });
  }

  const completed = args.status === 'COMPLETED';

  return new BbPromise((resolve, reject) => {
    Todo
    .query(completed ? 1 : 0)
    .usingIndex('CompletedIndex')
    .descending()
    .exec((err, result) => {
      console.log('Retieved items', err, result);
      if(err) reject(err);
      else resolve(mapItems(result.Items));
    });
  });
}

const addTodo = (args) => {
  console.log('Adding todo: ', args);

  const todo = {
    id: uuid.v4(),
    name: args.name,
    completed: 0
  };

  return new BbPromise((resolve, reject) => {
    Todo.create(todo, (err, result) => {
      console.log('Added item', err, result);
      if(err) reject(err);
      else resolve(mapItem(result));
    });
  });
}

const setTodoCompleted = (args) => {
  console.log('Setting todo completed: ', args);

  const todo = {
    id: args.id,
    completed: args.completed ? 1 : 0
  };

  return new BbPromise((resolve, reject) => {
    Todo.update(todo, (err, result) => {
      console.log('Updated item', err, result);
      if(err) reject(err);
      else resolve(mapItem(result));
    });
  });
}

module.exports = {
  getTodos,
  addTodo,
  setTodoCompleted,
};
