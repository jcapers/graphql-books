import styles from './AddBooks.module.css';
import { useMutation, useQuery } from '@apollo/client';
import { AuthorsData, getAuthorsQuery } from '../../graphql/get-authors.query';
import React, { useMemo, useState } from 'react';
import { Author } from '../../models/author.model';
import { addBookMutation, AddBookResponse, AddBookVars } from '../../graphql/add-book.query';
import { BooksData, getBooksQuery } from '../../graphql/get-books.query';

interface NewBookInputs {
  bookName: string;
  genre: string;
  authorId: string;
}

/**
 * Add new book component.
 */
export default function AddBook() {
  /**
   * getAuthors query with Apollo Client.
   */
  const {
    data: getAuthorsData,
    loading: getAuthorsLoading,
    error: getAuthorsError
  } = useQuery<AuthorsData>(getAuthorsQuery);

  /**
   * addBook mutation with Apollo Client.
   *
   * Update to write cache required as the mutation does not return entire set of books.
   */
  const [addBook, { data: addBookData, loading: addBookLoading, error: addBookError }] = useMutation<
    AddBookResponse,
    AddBookVars
  >(addBookMutation, {
    update(cache, { data }) {
      const newBookResponse = data?.addBook;
      const existingBooks = cache.readQuery<BooksData>({
        query: getBooksQuery
      });

      if (existingBooks && newBookResponse) {
        cache.writeQuery({
          query: getBooksQuery,
          data: {
            books: [...existingBooks?.books, newBookResponse]
          }
        });
      }
    }
  });

  /**
   * Sorted list of authors from data.
   */
  const sortedAuthors = useMemo(() => {
    if (getAuthorsData?.authors) {
      const authors: Author[] = [...getAuthorsData.authors];
      return authors.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    }
    return [];
  }, [getAuthorsData]);

  /**
   * Form state for adding a new book.
   */
  const [newBook, setNewBook] = useState<NewBookInputs>({
    bookName: '',
    genre: '',
    authorId: ''
  });

  /**
   * Handles all form onChange updates.
   *
   * @param name - key for value in newBook state.
   */
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewBook({
      ...newBook,
      [name]: e.currentTarget.value
    });
  };

  /**
   * Handle form submission to graphql mutation.
   *
   * @param e - HTML Form Element event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newBook);
    addBook({
      variables: { name: newBook.bookName, genre: newBook.genre, authorId: newBook.authorId }
    });
  };

  return (
    <div className="space-y-2 rounded-lg bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-700">Add Books</h2>
      {getAuthorsError && (
        <div className="text-red-500">
          <p>An error occured while trying to load authors...</p>
          <p>{getAuthorsError.message}</p>
        </div>
      )}
      {addBookError && (
        <div className="text-red-500">
          <p>An error occured while adding book...</p>
          <p>{addBookError.message}</p>
        </div>
      )}

      <form id="add-book-form" onSubmit={handleSubmit}>
        <div className={`${styles['field-group']}`}>
          <label className={`${styles.label}`} htmlFor="book-name">
            Book name
          </label>
          <input
            className={`${styles.input}`}
            id="book-name"
            type="text"
            placeholder="Enter a book name..."
            onChange={handleInputChange('bookName')}
          />
        </div>

        <div className="mb-2 flex flex-col space-y-1">
          <label className={`${styles.label}`} htmlFor="book-genre">
            Genre
          </label>
          <input
            className={`${styles.input}`}
            id="book-genre"
            type="text"
            placeholder="Enter a genre..."
            onChange={handleInputChange('genre')}
          />
        </div>

        <div className="mb-2 flex flex-col space-y-1">
          <label className={`${styles.label}`} htmlFor="book-author">
            Author
          </label>
          {getAuthorsLoading && <p>Loading Authors...</p>}
          <select className={`${styles.input}`} id="book-author" onChange={handleInputChange('authorId')}>
            <option>Select author</option>
            {!getAuthorsLoading &&
              sortedAuthors.map(author => (
                <option key={author.id} id={`option-${author.id}`} value={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>

        <button
          className="mt-2 rounded bg-teal-600 py-1 px-4 text-white shadow hover:opacity-90 hover:shadow-teal-500/50 focus:ring-2"
          id="add-book-btn"
          type="submit"
          disabled={addBookLoading}
        >
          {addBookLoading ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
