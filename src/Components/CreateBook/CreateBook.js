import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";


function CreateBook(){

    const [bookName, setBookName ] = useState("");
    const [isbn, setIsbn] = useState("");
    const [description, setDescription] = useState("");
    const [price, SetPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const submitRequest = async (e) => {

        //e.preventDefault();

        try {
            //send api request to spring boot application
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/v1/api/book",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    "isbn": isbn,
                    "name": bookName,
                    "description": description,
                    "price": price,
                    "quantity": quantity
                }
            });

            console.log(response.data);

            //reset the form, clear all fields
            e.target.reset();
        } catch (error) {
            console.log(error);
        }

        //e.preventDefault();
        return false;
    };

    const preSubmit = (e) => {
        e.preventDefault();
        return submitRequest(e);
    };

    return (
        <Box component="form" sx={{m: 6 ,width: "80%"}} >
            <form onSubmit={preSubmit } >

                <Grid xs={{m: 2, p:16}} container rowSpacing={1} columnSpacing={{ xs:1, sm: 2, md: 3}}>
                     <Grid item xs={12}>
                        <TextField label="ISBN" onChange={e=> setIsbn(e.target.value)} />
                    </Grid>

                    <Grid  item xs={12}>
                        <TextField label="Name of the Book" onChange={e=> setBookName(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="text" label="Book Description" onChange={e=> setDescription(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="text" label="Book Price" onChange={e=> SetPrice(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="text" label="Quantity in inventory" onChange={e=> setQuantity(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="outlined"> Add New Book </Button>
                    </Grid>
                </Grid>
            </form> 
        </Box>
    );
}      
export default CreateBook;
        