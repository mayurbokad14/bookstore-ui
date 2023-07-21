import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';

import AddGenre from "./Components/Genres/AddGenre";
import AddCustomer from './Components/Customers/AddCustomer';
import AddAuthor from './Components/Authors/AddAuthor';
import ClippedDrawer from './Components/SearchAppBar/ClippedDrawer';
import { useState } from 'react';
import { ListGenres } from './Components/Genres/ListGenres';
import { ListAuthor } from './Components/Authors/ListAuthor';
import { ListCustomer } from './Components/Customers/ListCustomer';
import AddBook from './Components/AddBook';



const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [activeView, setActiveView] = useState("addauthor");

  const handleActiveView = (view) => {
    setActiveView(view);
  };

  const renderActiveView = (view) =>{
    switch(view){
      case "addcustomer":
        return <AddCustomer />
      case "addgenre":
        return <AddGenre />
      case "addauthor":
        return <AddAuthor />
      case "listgenres":
        return <ListGenres />
      case "listauthor":
        return <ListAuthor/>
      case "listcustomer":
        return <ListCustomer/>
      case "addbook":
        return <AddBook/>
      default:
        return <AddAuthor />;
    }
  }

  return (
    <ThemeProvider theme={darkTheme} >
      <ClippedDrawer selectedView={handleActiveView}/>


      {
        renderActiveView(activeView)
      }
      
    </ThemeProvider>
  );

}

export default App;
