import { gql } from '@apollo/client';

export interface AddBookResponse {
  id: string;
  name: string;
}

export const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
