import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';

import AddGenre from "./Components/Genres/AddGenre";
import AddCustomer from './Components/Customers/AddCustomer';
import AddAuthor from './Components/Authors/AddAuthor';
import ClippedDrawer from './Components/SearchAppBar/ClippedDrawer';
import { useState } from 'react';

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
        return <AddCustomer />;
      case "addgenre":
        return <AddGenre />
      case "addauthor":
        return <AddAuthor />
      default:
        return <AddAuthor />;
    }
  }

  return (
    <ThemeProvider theme={darkTheme} >
      {renderActiveView(activeView)}
      <ClippedDrawer selectedView={handleActiveView}/>
    </ThemeProvider>
  );
}

export default App;
