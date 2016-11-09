'use strict';

const graphql = require('graphql');

module.exports = graphql.buildSchema(`
  type todo {
    id: String!,
    name: String!,
    completed: Boolean!,
  }

  enum TodoStatus {
    ANY
    ACTIVE
    COMPLETED
  }

  type Query {
    getTodos(status: TodoStatus!): [todo!]
  }

  type Mutation {
    addTodo(name: String!): todo!
  }
`);
