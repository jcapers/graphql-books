import './App.css';
import BookList from './components/BookList/BookList';

function App() {
  return (
    <div className="app-container">
      <header className="sticky top-0 z-50 w-full bg-zinc-900 py-4 text-white">
        <div className="fluid-container">
          <h1 className="text-2xl lg:text-4xl">GraphQL Books</h1>
        </div>
      </header>
      <main className="w-full">
        <div className="fluid-container">
          <BookList />
        </div>
      </main>
    </div>
  );
}

export default App;
