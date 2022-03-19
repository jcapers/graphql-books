import { Author } from './author.model';

export interface Book {
  __typename: 'Book';
  id: string;
  name: string;
  genre: string;
  author: Author;
}
