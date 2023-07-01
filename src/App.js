import { Button } from '@mui/material';
import './App.css';
import CreateBook from './Components/CreateBook/CreateBook';
import ListBooks from './Components/ListBooks/ListBooks';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <CreateBook />
      <ListBooks maxItems={5} />
    </div>
  );
}

export default App;
