import styles from './AddAuthor.module.css';
import { useMutation } from '@apollo/client';
import { getAuthorsQuery } from '../../graphql/get-authors.query';
import React, { useState } from 'react';
import { addAuthorMutation, AddAuthorResponse, AddAuthorVars } from '../../graphql/add-author.query';

interface NewAuthorInputs {
  authorName: string;
  dob: string;
}

/**
 * Add new book component.
 */
export default function AddAuthor() {
  /**
   * addBook mutation with Apollo Client.
   *
   * Update to write cache required as the mutation does not return entire set of books.
   */
  const [addAuthor, { data: addAuthorData, loading: addAuthorLoading, error: addAuthorError }] = useMutation<
    AddAuthorResponse,
    AddAuthorVars
  >(addAuthorMutation, {
    refetchQueries: [{ query: getAuthorsQuery }]
  });

  /**
   * Form state for adding a new book.
   */
  const [newAuthor, setNewAuthor] = useState<NewAuthorInputs>({
    authorName: '',
    dob: ''
  });

  /**
   * Handles all form onChange updates.
   *
   * @param name - key for value in newBook state.
   */
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAuthor({
      ...newAuthor,
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
    console.log(newAuthor);
    addAuthor({
      variables: { name: newAuthor.authorName, dob: parseInt(newAuthor.dob) }
    });
  };

  return (
    <div className="space-y-2 rounded-lg bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-700">Add Author</h2>
      {addAuthorError && (
        <div className="text-red-500">
          <p>An error occured while adding author...</p>
          <p>{addAuthorError.message}</p>
        </div>
      )}

      <form id="add-author-form" onSubmit={handleSubmit}>
        <div className={`${styles['field-group']}`}>
          <label className={`${styles.label}`} htmlFor="author-name">
            Author name
          </label>
          <input
            className={`${styles.input}`}
            id="author-name"
            type="text"
            placeholder="Enter author name..."
            onChange={handleInputChange('authorName')}
          />
        </div>

        <div className="mb-2 flex flex-col space-y-1">
          <label className={`${styles.label}`} htmlFor="author-dob">
            Birth Year
          </label>
          <input
            className={`${styles.input}`}
            id="author-dob"
            type="text"
            placeholder="Enter year of birth..."
            onChange={handleInputChange('dob')}
          />
        </div>

        <button
          className="mt-2 rounded bg-teal-600 py-1 px-4 text-white shadow hover:opacity-90 hover:shadow-teal-500/50 focus:ring-2"
          id="add-book-btn"
          type="submit"
          disabled={addAuthorLoading}
        >
          {addAuthorLoading ? 'Adding Author...' : 'Add Author'}
        </button>
      </form>
    </div>
  );
}
