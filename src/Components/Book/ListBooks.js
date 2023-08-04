import { Box, Button, Card, Chip, Container, Typography } from "@mui/material";
import { useState } from "react";



export default function ListBooks(){

    const [bookList, setBookList] = useState([
        {
            isbn: "isbn 123",
            title: "Harry Potter and Chamber of Secrets",
            author: {
                name: "J K Hello world",
                author_id : 1
            },
            genre: {
                genre_id : 1,
                name: "Kids"
            },
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            price: 110.30,
            publication_date: "Aug 2, 2023"
        },
        {
            isbn: "456",
            title: "Shiva Triology",
            author: {
                name: "Amish Tripathy",
                author_id : 2
            },
            genre: {
                genre_id : 2,
                name: "Mythology"
            },
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            price: 110.30,
            publication_date: "Aug 2, 2023"
        }
    ]);

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
                                <Button variant="outlined">Add to Cart</Button>
                            </Card>
                        )
                    })
                }
                
            </Container>
        </Box>
      </div>

    );
}


 

