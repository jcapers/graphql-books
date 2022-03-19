import { useQuery } from '@apollo/client';
import { BookData, getBooksQuery } from '../../graphql/get-books.query';

export default function BookList() {
  const { loading, error, data } = useQuery<BookData>(getBooksQuery);

  console.log(data);

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

      {data?.books && (
        <div>
          <ul id="book-list">
            {data.books.map(book => (
              <li>{book.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
