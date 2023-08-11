import { Box, Button, Card, Chip, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { listBooks } from "../../API/book";

import {ShopingCartContext} from "../../Contexts/ShopingCart";
import IncrementDecrement from "../IncrementDecrement/IncrementDecrement";




export default function ListBooks(){

    const [bookList, setBookList] = useState([]);

    const {cartItems, setCartItems} = useContext(ShopingCartContext);


    useEffect(()=>{
        listBooks().then(booksApi=>{
            setBookList(booksApi.data);
        });
    },[]);

    
    const isbnExist = isbn => {
        return isbn in cartItems;
    };

    const addBookToCart = event => {
        console.log(event.currentTarget.getAttribute('data-id'));

        let newItem = {
        };

        newItem[event.currentTarget.getAttribute('data-id')] = 1;

        setCartItems(prev=>{
            return {
                ...prev,
                ...newItem
            };
        });

    };


    const incrementDecrementChangeEvent = (value,uid) => {
        console.log(value,uid);

        if(value===0){
            setCartItems(prev=> {

                let temp = {...prev};
                delete temp[uid];

                return temp;

            });
        }
        else{
            setCartItems(prev => {
                let temp={...prev};
                temp[uid]= value;

                return temp;
            });
        }
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
                                    {
                                        isbnExist(item.isbn) ? <IncrementDecrement uid={item.isbn} defaulValue={cartItems[item.isbn]} valueChangeEvent={incrementDecrementChangeEvent} /> : <Button data-id={item.isbn} onClick={addBookToCart} variant="outlined">Add to Cart</Button>
                                    }
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


 

