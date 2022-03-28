import { gql } from '@apollo/client';
import { Book } from '../models/book.model';

export interface BookDetailResult {
  book: Book;
}

export const getBookDetailsQuery = gql`
  query getBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        dob
        books {
          id
          name
        }
      }
    }
  }
`;
