# GraphQL Learning

Simple bit of NodeJS + React learning/playing around with GraphQL.

Basically a CRUD app for books and authors.

## GraphQL Operations

```
query GetAuthors {
  authors {
    id
    name
    dob
    books {
      id
      name
      genre
    }
  }
}

query GetAuthor($id: ID!) {
  author(id: $id) {
    id
    name
    dob
    books {
      id
      name
      genre
    }
  }
}
```

```
query GetBooks {
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

query GetBook($id: ID!) {
  book(id: $id) {
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
```

```
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

mutation AddAuthor($name: String!, $dob: Int!) {
  addAuthor(name: $name, dob: $dob) {
    id
    name
    dob
  }
}
```
