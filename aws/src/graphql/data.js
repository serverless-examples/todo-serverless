'use strict'

const dynogels = require('dynogels');
const Joi = require('joi');

const todoTableName = process.env.TODO_TABLE_NAME;

const Todo = dynogels.define('Todo', {
  tableName: todoTableName,
  hashKey: 'id',
  timestamps : true,
  schema: {
    id: Joi.string(),
    name: Joi.string(),
    completed: Joi.number(),
  },
  indexes: [{
    hashKey: 'completed',
    name: 'CompletedIndex',
    type: 'global'
  }]
});

module.exports = {
  Todo,
}
