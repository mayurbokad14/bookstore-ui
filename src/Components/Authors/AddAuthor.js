import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import { useState } from "react";
import validator from "validator";

export default function AddAuthor(){

    const [author, setAuthor] = useState({
        name : {
            value: null,
            validationFailed: false,
            helperText: "Invalid Input"
        },

        bio: {
            value: null,
            validationFailed: false,
            helperText: "Invalid Input"
        }
    });

    const handleName = (event) => {

        setAuthor(prev => {
            return {
                ...prev,
                name: event.target.value.trim(),
                validationFailed: event.target.value.trim().length == 0
            }
        });
    };
    const handleBio = (event) => {

        setAuthor(prev => {
            return {
                ...prev,
                bio: event.target.value.trim(),
                validationFailed: event.target.value.trim().length == 0
            }
        });
    };


    return (
        <div style={{padding:"5px"}} >
            <Box sx={{flexGrow: 1}} >
                <Container maxWidth="sm">
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Add New Author
                                </Typography>
                                </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Name" required onChange={handleName} error={author.name.validationFailed} helperText={author.name.validationFailed ? author.name.helperText : null}   />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField variant="standard" label="Biography" required onChange={handleBio} error={author.bio.validationFailed} helperText={author.bio.validationFailed ? author.bio.helperText : null}  />
                            </Grid>
                            <Grid item xs={12} md={12}> 
                                <Button style={{minWidth:"200px"}}  variant="outlined" size="large" disabled={
                                    author.name.validationFailed || author.bio.validationFailed 
                                } >Add</Button>
                            </Grid>
                        </Grid>
                </Container>
            </Box>
        </div>
    );

};

