import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";


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

    const [disableSubmit, setDisableSubmit] = useState(true);

    const [alertConfig, setAlertConfig] = useState({
        show: false,
        msg: "",
        severity : "success"
    });

    const handleName = (event) => {

        setAuthor(prev => {
            return {
                ...prev,
                name: event.target.value.trim(),
                validationFailed: event.target.value.trim().length === 0
            }
        });

        setDisableSubmit(false);
    };

    const handleBio = (event) => {

        setAuthor(prev => {
            return {
                ...prev,
                bio: event.target.value.trim(),
                validationFailed: event.target.value.trim().length === 0
            }
        });

        setDisableSubmit(false);
    };

    const disappearAlert = (duration) => {
        setTimeout(()=>{
            setAlertConfig(prev=>{
                return {
                    ...prev,
                    show: false
                }
            });
        }, duration);
    };

    const submitRequest = async (event) => {

        setDisableSubmit(true);

        try {
            const response = await axios({
                url : "http://localhost:3001/bookstore/v1/author",
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                data: {
                    name: author.name,
                    bio: author.bio
                }
            });

            console.log(response.data);

            if(event !==null){
                event.target.reset();
            }

            if(response.status === 200){
                setAlertConfig({
                    severity: "success",
                    msg: response.data.message,
                    show: true
                });
            }

            disappearAlert(5000);
            
        } catch (error) {

            console.log(error);
            setDisableSubmit(false);

            setAlertConfig({
                severity: "error",
                msg: "Something went wrong, please try after sometime",
                show: true
            });

            disappearAlert(7000);
        }

        //setDisableSubmit(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        submitRequest(event);

        return false;
    };


    return (
        <div style={{padding:"5px"}} >
            <Box sx={{flexGrow: 1}} >

                <Container maxWidth="sm">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Add New Author
                                </Typography>
                                </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField inputProps={{maxLength: 100}} variant="standard" label="Name" required onChange={handleName} error={author.name.validationFailed} helperText={author.name.validationFailed ? author.name.helperText : null}   />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField inputProps={{maxLength: 255}} multiline fullWidth minRows={2} variant="outlined" label="Biography" required onChange={handleBio} error={author.bio.validationFailed} helperText={author.bio.validationFailed ? author.bio.helperText : null}  />
                            </Grid>
                            <Grid item xs={12} md={12}> 
                                <Button type="submit" style={{minWidth:"200px"}}  variant="outlined" size="large" disabled={
                                    author.name.validationFailed || author.bio.validationFailed || disableSubmit
                                } >Add</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>

                <Container maxWidth="md" style={{marginTop:"20px"}}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            {
                                alertConfig.show ?
                                <Alert severity={alertConfig.severity}>
                                    {alertConfig.msg}
                                </Alert>
                                : null
                            }
                            
                        </Grid>
                    </Grid>
                    
                </Container>
            </Box>
        </div>
    );

};

