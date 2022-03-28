import { gql } from '@apollo/client';
import { Book } from '../models/book.model';

export interface BooksData {
  books: Book[];
}

export const getBooksQuery = gql`
  query getBooks {
    books {
      id
      name
      author {
        id
        name
      }
    }
  }
`;
