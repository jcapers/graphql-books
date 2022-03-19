import { gql } from '@apollo/client';
import { Book } from '../models/book.model';

export interface BookData {
  books: Book[];
}

export const getBooksQuery = gql`
  query getBooks {
    books {
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