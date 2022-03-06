const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLString } = graphql;

const BOOKS_DUMMY_DATA = [
  { name: 'Gideon the Ninth', genre: 'SciFi', id: '1', authorId: '1' },
  { name: 'Harrow the Ninth', genre: 'SciFi', id: '2', authorId: '1' },
  { name: `Crier's War`, genre: 'SciFi', id: '3', authorId: '2' },
  { name: 'Star Wars Thrawn', genre: 'SciFi', id: '4', authorId: '3' },
  { name: 'Star Wars Thrawn Alliances', genre: 'SciFi', id: '5', authorId: '3' },
  { name: 'Star Wars Thrawn Treason', genre: 'SciFi', id: '6', authorId: '3' },
  { name: 'The Lord of the Rings', genre: 'Fantasy', id: '7', authorId: '4' },
  { name: 'The Hobbit', genre: 'Fantasy', id: '7', authorId: '4' },
];

const AUTHOR_DUMMY_DATA = [
  { name: 'Tamsyn Muir', age: 36, id: '1' },
  { name: 'Nina Varela', age: 26, id: '2' },
  { name: 'Timothy Zahn', age: 70, id: '3' },
  { name: 'J. R. R. Tolkien', age: 55, id: '4' },
];

/**
 * Types establishes a schema for each type of data.
 */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // Associates author with books, 1-way relation only.
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // Parent is the Book here.
        return _.find(AUTHOR_DUMMY_DATA, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // Allows for a list of book types
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Remember parent is the Author here.
        return _.filter(BOOKS_DUMMY_DATA, { authorId: parent.id });
      },
    },
  }),
});

/**
 * Root query defines the actual queries that can be fun.
 *
 * Allows us to give args for the query, such as ids.
 *
 * The resolve function tells graphql how to get the data.
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Get data from db
        return _.find(BOOKS_DUMMY_DATA, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BOOKS_DUMMY_DATA;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(AUTHOR_DUMMY_DATA, { id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return AUTHOR_DUMMY_DATA;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
