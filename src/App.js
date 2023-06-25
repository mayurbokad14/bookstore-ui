import './App.css';
import CreateBook from './Components/CreateBook/CreateBook';
import ListBooks from './Components/ListBooks/ListBooks';

function App() {
  return (
    <div className="App">
      <CreateBook />
      <ListBooks/>
    </div>
  );
}

export default App;
