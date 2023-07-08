import { Box, Button, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import './App.css';
import CreateBook from './Components/CreateBook/CreateBook';
import ListBooks from './Components/ListBooks/ListBooks';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import bgimg from "./pexels-tuur-tisseghem-626986.jpg";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    
    <ThemeProvider theme={darkTheme} >
      
      <CssBaseline />
      <Box>
        <Toolbar>
          <IconButton size='large'
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component="div"sx={{ flexGrow: 1 }}>Mayur's Bookstore</Typography>
        </Toolbar>

        <CreateBook />

      </Box>
    </ThemeProvider>
  );
}

export default App;
