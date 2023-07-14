import { Box, Button, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import './App.css';
import CreateBook from './Components/CreateBook/CreateBook';
import ListBooks from './Components/ListBooks/ListBooks';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import bgimg from "./pexels-tuur-tisseghem-626986.jpg";
import SearchAppBar from './Components/SearchAppBar/SearchAppBar';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme} >
      <SearchAppBar />
      <CreateBook />
    </ThemeProvider>
  );
}

export default App;
