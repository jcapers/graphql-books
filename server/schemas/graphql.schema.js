const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLSchema, GraphQLString } = graphql;

const BOOKS_DUMMY_DATA = [
  { name: 'Gideon the Ninth', genre: 'SciFi', id: '1' },
  { name: 'Harrow the Ninth', genre: 'SciFi', id: '2' },
  { name: `Crier's War`, genre: 'SciFi', id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Get data from db
        return _.find(BOOKS_DUMMY_DATA, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
