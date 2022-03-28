import { useQuery } from '@apollo/client';
import { BookDetailResult, getBookDetailsQuery } from '../../graphql/get-book-details.query';

type Props = {
  bookId?: string | null;
};

/**
 * Book Details component to show book details when a user clicks a book.
 */
export default function BookDetails({ bookId = null }: Props) {
  /**
   * Apollo client graphql states and data respnse.
   */
  const { loading, error, data } = useQuery<BookDetailResult>(getBookDetailsQuery, { variables: { id: bookId } });

  console.log(data);

  return (
    <div id="book-details">
      {data?.book ? (
        <div className="space-y-2 p-4">
          <h2 className="text-2xl font-bold text-gray-700">{data.book.name}</h2>
          <div>
            <h3 className="text-xl font-bold text-gray-700">Author</h3>
            <p>
              {data.book.author?.name} (Born: {data.book.author?.dob})
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700">Genre</h3>
            <p>{data.book.genre}</p>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <p>Select a book to view details</p>
        </div>
      )}
    </div>
  );
}
