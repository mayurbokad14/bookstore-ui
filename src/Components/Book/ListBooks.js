import { Box, Button, Card, Chip, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { listBooks } from "../../API/book";




export default function ListBooks({cartHandler}){

    const [bookList, setBookList] = useState([]);


    useEffect(()=>{
        listBooks().then(booksApi=>{
            setBookList(booksApi.data);
        });
    },[]);


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
                                    <Button variant="outlined" onClick={cartHandler}  >Add to Cart</Button>
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


 

