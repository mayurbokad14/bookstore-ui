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
import AddBook from './Components/Book/AddBook';
import ListBooks from './Components/Book/ListBooks';

import {ShopingCartContext} from "./Contexts/ShopingCart";
import { ActiveView } from './Contexts/ActiveView';
import ShopingCart from './Components/ShopingCart/ShopingCart';


const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [activeView, setActiveView] = useState("addauthor");

  const [cartItems, setCartItems ] = useState({});


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
      case "listbook":
        return <ListBooks />
      case "shopingcart":
        return <ShopingCart/>
      default:
        return <AddAuthor />;
    }
  }



  return (

    <ThemeProvider theme={darkTheme} >
      <ShopingCartContext.Provider value={{ cartItems, setCartItems }}>
        <ActiveView.Provider value={{setActiveView}} >
          <ClippedDrawer   />
        </ActiveView.Provider>

      
        {
          renderActiveView(activeView)
        }
      </ShopingCartContext.Provider>

    </ThemeProvider>

  );

}

export default App;
