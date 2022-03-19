import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { BooksData, getBooksQuery } from '../../graphql/get-books.query';

/**
 * Book list component shows all books from data.
 */
export default function BookList() {
  /**
   * Apollo client graphql states and data respnse.
   */
  const { loading, error, data } = useQuery<BooksData>(getBooksQuery);

  /**
   * Render book list if there are books available in data.
   * Otherwise, tell user no books were found.
   */
  const renderBooks = useCallback(() => {
    if (data?.books && data?.books.length > 0) {
      return (
        <ul id="book-list">
          {data.books.map(book => (
            <li key={`book-${book.id}`}>{book.name}</li>
          ))}
        </ul>
      );
    }
    return <p>No books found...</p>;
  }, [data]);

  return (
    <div className="space-y-4 rounded-lg bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-700">Books</h2>
      {loading && (
        <div>
          <p>Loading books...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500">
          <p>An error occured while loading books...</p>
          <p>{error.message}</p>
        </div>
      )}

      {!loading && <div>{renderBooks()}</div>}
    </div>
  );
}
