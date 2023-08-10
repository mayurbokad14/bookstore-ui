import { Box, Button, Card, Chip, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { listBooks } from "../../API/book";

import {ShopingCartContext} from "../../Contexts/ShopingCart";




export default function ListBooks(){

    const [bookList, setBookList] = useState([]);

    const {setCartQuantity} = useContext(ShopingCartContext);


    useEffect(()=>{
        listBooks().then(booksApi=>{
            setBookList(booksApi.data);
        });
    },[]);



    const updateQuantity = event =>{
        setCartQuantity(value => {
            return value + 1;
        });
    };


    return (
      <div>
        <Box>
            <Container >

                {
                    bookList.map( item => {
                        return (
                            <Card sx={{p: 4, mt: 4}} key={item.isbn}>
                                <p>{item.isbn}</p>
                                <Chip label={item.genre.name} size="small" color="secondary" />
                                <Typography variant="h2">
                                    {item.title}
                                </Typography>
                                <p>by {item.author.name} | {item.publication_date}</p>
                                
                                <Typography variant="body1">
                                    {item.description}
                                </Typography>
                                <p></p>
                                <Typography variant="h4">
                                    &#8377;{item.price}
                                </Typography>
                                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                                    <Button variant="outlined" onClick={updateQuantity}>Add to Cart</Button>
                                </Box>
                            </Card>
                        )
                    })
                }
                
            </Container>
        </Box>
      </div>

    );
}


 

