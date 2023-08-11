import { Box, Card, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import IncrementDecrement from "../IncrementDecrement/IncrementDecrement";


export default function ShopingCart(){

    const items = {
        "9781408855652" : {
            price: 336,
            title: "Harry Potter and the Sorcerer's Stone",
            quantity : 3
        },
        "97814088556231": {
            price: 336,
            title: "Hello World",
            quantity : 4
        }
    };

    const getTableRows = (cartItems) => {
        const tableRows = [];

        for(let item of Object.keys(cartItems)){
            tableRows.push(
                <TableRow key={item} >
                    <TableCell sx={{ borderBottom: "none" }}>
                        <Card sx={{ p: "2px", border: "none" }} variant="outlined">
                            <Typography variant="h5">{cartItems[item].title}</Typography>
                            <p>ISBN : {item}</p>
                        </Card>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                        <IncrementDecrement uid={item} defaulValue={cartItems[item].quantity} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                        &#8377; {cartItems[item].price}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }} align="right">&#8377; {cartItems[item].price * cartItems[item].quantity}</TableCell>
                </TableRow>
            );
        }

        return tableRows;
    };



    return(
        
        <div>      
            <Box> 
                <Container>
                    <Typography variant="h2">
                        Shopping Cart
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell >Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getTableRows(items)}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>
            </Box>
        </div>
    )
}