import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { BookData, getBooksQuery } from '../../graphql/get-books.query';

export default function BookList() {
  const { loading, error, data } = useQuery<BookData>(getBooksQuery);

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
    <div className="my-8 rounded bg-white p-4 shadow">
      <h2 className="text-2xl">Books</h2>
      {loading && (
        <div>
          <p>Loading books...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500">
          <p>{error.message}</p>
        </div>
      )}

      {data?.books && <div>{renderBooks()}</div>}
    </div>
  );
}
