const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString } = graphql;

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
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dob: { type: GraphQLInt },
    // Allows for a list of book types
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Remember parent is the Author here.
        return Book.find({ authorId: parent.id });
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
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // No args returns all matches
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  }),
});

/**
 * Mutations allows us to update data.
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          dob: args.dob,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
