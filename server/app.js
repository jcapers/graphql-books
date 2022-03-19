const dotenv = require('dotenv');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/graphql.schema');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
  console.info('INFO: Loaded .env.local');
}

const app = express();

// CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// DB
const dbName = process.env.SERVER_DB_NAME;
const dbUser = process.env.SERVER_DB_USER;
const dbSecret = process.env.SERVER_DB_SECRET;

const dbConnection = `mongodb+srv://${dbUser}:${dbSecret}@cluster0-graphql.j5j19.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbConnection);
mongoose.connection.once('open', () => {
  console.info(`INFO: Connected to DB: ${dbName}`);
});

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Start Server
app.listen(process.env.SERVER_PORT, () => {
  console.info(`INFO: Server listening on port ${process.env.SERVER_PORT}.`);
});
