import styles from './AddBooks.module.css';
import { useQuery } from '@apollo/client';
import { AuthorsData, getAuthorsQuery } from '../../graphql/get-authors.query';
import { useMemo } from 'react';
import { Author } from '../../models/author.model';

export default function AddBook() {
  const { loading, error, data } = useQuery<AuthorsData>(getAuthorsQuery);
  const sortedAuthors = useMemo(() => {
    if (data?.authors) {
      const authors: Author[] = [...data.authors];
      return authors.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    }
    return [];
  }, [data]);

  return (
    <div className="space-y-2 rounded bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-700">Add Books</h2>
      {error && (
        <div className="text-red-500">
          <p>An error occured while trying to load authors...</p>
          <p>{error.message}</p>
        </div>
      )}

      <form id="add-book-form">
        <div className={`${styles['field-group']}`}>
          <label className={`${styles.label}`} htmlFor="book-name">
            Book name
          </label>
          <input className={`${styles.input}`} id="book-name" type="text" placeholder="Enter a book name..." />
        </div>

        <div className="mb-2 flex flex-col space-y-1">
          <label className={`${styles.label}`} htmlFor="book-genre">
            Genre
          </label>
          <input className={`${styles.input}`} id="book-genre" type="text" placeholder="Enter a genre..." />
        </div>

        <div className="mb-2 flex flex-col space-y-1">
          <label className={`${styles.label}`} htmlFor="book-author">
            Author
          </label>
          {loading && <p>Loading Authors...</p>}
          <select className={`${styles.input}`} id="book-author">
            <option>Select author</option>
            {!loading && sortedAuthors.map(author => <option key={author.id}>{author.name}</option>)}
          </select>
        </div>
      </form>
    </div>
  );
}
