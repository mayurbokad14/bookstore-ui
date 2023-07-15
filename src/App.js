import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';

import SearchAppBar from './Components/SearchAppBar/SearchAppBar';
import DrawerLeft from './Components/SearchAppBar/Drawer';
import AddCustomer from './Components/Customers/AddCustomer';
import AddGenre from './Components/Genres/AddGenre';
import AddAuthor from './Components/Authors/AddAuthor';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme} >
      <SearchAppBar />

      <AddAuthor/>
      
    </ThemeProvider>
  );
}

export default App;
