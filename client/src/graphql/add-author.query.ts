import { gql } from '@apollo/client';
import { Author } from '../models/author.model';

export interface AddAuthorResponse {
  addAuthor: Author;
}

export interface AddAuthorVars {
  name: string;
  dob: number;
}

export const addAuthorMutation = gql`
  mutation addAuthor($name: String!, $dob: Int!) {
    addAuthor(name: $name, dob: $dob) {
      id
      name
      dob
    }
  }
`;
