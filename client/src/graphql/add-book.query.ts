import { gql } from '@apollo/client';
import { Book } from '../models/book.model';

export interface AddBookResponse {
  addBook: Book;
}

export interface AddBookVars {
  name: string;
  genre: string;
  authorId: string;
}

export const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
        dob
      }
    }
  }
`;
