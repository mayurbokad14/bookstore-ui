import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import { useState } from "react";


export default function AddGenre(){

    const [genre, setGenre] = useState({
        name: {
            value: null,
            validationFailed: false,
            helperText: "Invalid Input"
        },
    });

    const handleName = (event) => {
        setGenre(prev =>{
            return {
                ...prev,
                name: {
                    ...prev.name,
                    value: event.target.value.trim(),
                    validationFailed: event.target.value.trim().length == 0
                }
            };
        });
    };

    return (
        <div style={{padding:"5px"}} >
            <Box sx={{flexGrow: 1}} >
                <Container maxWidth="sm">
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Add New Genre
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Name" required  />
                            </Grid>
                            <Grid item xs={12} md={12}> 
                                <Button style={{minWidth:"200px"}}  variant="outlined" size="large" disabled={
                                    genre.name.validationFailed 
                                } >Add</Button>
                            </Grid>
                        </Grid>   
                </Container>
            </Box>
        </div>
    );
};