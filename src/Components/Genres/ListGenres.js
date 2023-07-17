import { Box, Chip, Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export function ListGenres() {


    const [genreList, setGenreList] = useState(null);

    const getGenres = async () => {

        const response = await axios({
            method: "get",
            url: "http://localhost:3001/bookstore/v1/genre"
        });

        console.log(response.data);

        setGenreList(response.data.data);
    };

    const getRandomColor = () => {
        const colors = ["info", "success", "error", "warning", "primary", "secondary"];

        return colors[Math.floor(Math.random() * 6)];
    };

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div style={{ padding: "5px" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="sm">
                    <Grid container spacing={8} justify="space-around">
                        <Grid item md={12}  >
                            {
                                genreList === null ? null :
                                    genreList.map(item => {
                                        return (
                                            <Chip sx={{ m: 1 }} label={item.name} size="small" key={item.genre_id} color={getRandomColor()} />
                                        );
                                    })
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );

}