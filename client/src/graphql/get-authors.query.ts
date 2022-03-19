import { gql } from '@apollo/client';
import { Author } from '../models/author.model';

export interface AuthorsData {
  authors: Author[];
}

export const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`;
