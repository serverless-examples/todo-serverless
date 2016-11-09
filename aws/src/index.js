'use strict';

require('dotenv').config();

// Setup env vars before requiring functions
const graphql = require('graphql');

const rootValue = require('./graphql/resolvers');
const schema = require('./graphql/schema');

module.exports.graphql = (event, context, cb) => {
  console.log('Received event', event);

  const contextValue = {};
  const body = JSON.parse(event.body);

  return graphql
    .graphql(schema, body.query, rootValue, contextValue, body.variables)
    .then((response) => cb(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    }))
    .catch((err) => cb(err));
};
