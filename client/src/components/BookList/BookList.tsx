import { useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { BooksData, getBooksQuery } from '../../graphql/get-books.query';
import BookDetails from '../BookDetails/BookDetails';

/**
 * Book list component shows all books from data.
 */
export default function BookList() {
  /**
   * Apollo client graphql states and data respnse.
   */
  const { loading, error, data } = useQuery<BooksData>(getBooksQuery);

  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const handleBookClick = (id: string) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setSelectedBook(id);
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="my-4 text-4xl font-bold text-white">Books</h2>
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

        {!loading && data?.books && data.books.length > 0 && (
          <div>
            <ul id="book-list" className="grid grid-cols-2 gap-5 lg:grid-cols-12">
              {data.books.map(book => (
                <li
                  key={`book-${book.id}`}
                  className={`col-span-1 h-10 cursor-pointer bg-white px-4 py-2 text-center text-sm 
                            hover:bg-indigo-100 hover:shadow-indigo-500 lg:col-span-3`}
                  onClick={handleBookClick(book.id)}
                >
                  {book.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded border bg-white shadow">
        <BookDetails bookId={selectedBook} />
      </div>
    </div>
  );
}
