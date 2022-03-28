import './App.css';
import AddBook from './components/AddBook/AddBook';
import BookList from './components/BookList/BookList';

function App() {
  return (
    <div className="app-container">
      <header className="sticky top-0 z-50 w-full bg-zinc-900 py-4 text-white">
        <div className="fluid-container">
          <h1 className="text-2xl lg:text-4xl">GraphQL Books</h1>
        </div>
      </header>
      <main className="mt-16 w-full">
        <div className="fluid-container mb-12">
          <BookList />
        </div>
        <div className="fluid-container mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="col-span-1">
            <AddBook />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
