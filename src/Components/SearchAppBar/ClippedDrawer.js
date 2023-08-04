import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Badge, Button, Grid, Icon, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';

const drawerWidth = 240;


export default function ClippedDrawer({ selectedView }) {

  const [totalQuanity, setTotalQuantity] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            BookStore
          </Typography>          
         
        
          <Box 
          display="flex"
          justifyContent="right"
          flexGrow={1}
          alignItems="justify-end"
          margin={1}
          >
            
              <IconButton aria-label='Shopping Cart'>
              <Badge color='secondary' badgeContent={totalQuanity}>
                <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            
            
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Add Author', 'List Author', 'Add Genre', "List Genres", 'Add Customer', 'List Customer', 'Add Book', 'List Book'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => {
                  if (selectedView !== null) {
                    selectedView(text.replace(" ", "").trim().toLowerCase())
                  }
                }
                }  >
                  <ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

