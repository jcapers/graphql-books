import { Book } from './book.model';

export interface Author {
  __typename: 'Author';
  id: string;
  name: string;
  dob: number;
  books?: Book;
}
