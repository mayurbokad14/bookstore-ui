import { Alert, Box, Button, Container, FormControl, Grid, Icon, InputAdornment, InputLabel,  MenuItem, Select, TextField, Typography ,} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { getAuthor } from "../API/author";
import { getGenres } from "../API/genre";

export default function AddBook(){


    const [authorList, setAuthorList] = useState([]);
    const [genreList , setGenreList] = useState([]);

    const [disabledSubmit, setDisableSubmit] = useState(true);


    const [alertConfig,setAlertConfig] = useState({
        show : false,
        severity: "info",
        msg : "Something went wrong"
    });


    const [book,setBook] = useState({
        isbn : {
            value : null,
            validationFailed : false,
            helperText : "ISBN Filed is required"
        },
        title : {
            value: null,
            validationFailed: false,
            helperText: "Book title is required"
        },
        author : {
            value :null,
            validationFailed : false,
            helperText : "Author is required"
        },
        genre : {
            value : null,
            validationFailed : false,
            helperText : "Genere is required"   
        },
        publicationdate :{
            value :moment().valueOf(),
            validationFailed : false,
            helperText : "Publicationdate is required"
        },
        price :{
            value : null,
            validationFailed : false,
            helperText : "Invalid Value"
        },
        description : {
            value : null,
            validationFailed : false,
            helperText : "Description is required"   
        }

    });



    //myfunction();

    useEffect(()=>{
        getAuthor().then(response=>{
            setAuthorList(response.data.data);
        }).catch(error=>{
            console.log(error);
        });

        getGenres().then(response=>{
            setGenreList(response.data.data);
        }).catch(error=>{
            console.log(error);
        });
        
    },[]);


    const handleISBN= (e) =>{
        const valueInTextField = e.target.value.trim();

        setDisableSubmit(false);

        setBook(prev => {
            return {
                ...prev,
                isbn : {
                    ...prev.isbn,
                    validationFailed : valueInTextField.length === 0,
                    value : valueInTextField
                }
            };
        });
    };

    const handleBookTitle = (e) => {
        const valueInTextField = e.target.value.trim();

        setDisableSubmit(false);

        setBook(prev => {
            return {
                ...prev,
                title : {
                    ...prev.title,
                    validationFailed : valueInTextField.length === 0,
                    value: valueInTextField
                }
            }
        });
    };

    const handleAuthor = e => {
        setBook(prev => {
            return {
                ...prev,
                author: {
                    ...prev.author,
                    value: e.target.value,
                    validationFailed: false
                }
            }
        });
    };

    const handleAuthorOnClose = e => {

        if(e.target.value === undefined){
            setBook(prev=> {
                return {
                    ...prev,
                    author: {
                        ...prev.author,
                        validationFailed: true
                    }
                }
            });  
        }
    };

    const handleGenre = e =>{
        setBook(prev =>{
            return{
            ...prev,
            genre :{
                ...prev.genre,
                value : e.target.value,
                validationFailed: false
            }
            }
        });
    };   

    const handleGenreOnClose = e =>{
        if(e.target.value === undefined){
            setBook(prev=>{
                return{
                    ...prev,
                    genre:{
                        ...prev.author,
                        validationFailed:true
                    }
                }
            });
        }

    };

    const handlePublicationDate = e =>{
        setBook(prev=>{
            return {
                ...prev,
                publicationdate:{
                    ...prev.publicationdate,
                    value: e.valueOf()
                }
            }
        })
    };

    const handlePrice = (e) =>{
        const textFieldValue = e.target.value.trim();
        setBook(prev=>{
            return{
                ...prev,
                price:{
                    ...prev.price,
                    value : Number(textFieldValue),
                    validationFailed : isNaN(textFieldValue) || Number(textFieldValue) <=0
                }
            }
        });
    }



    const handleDiscription = (e) => {
        const valueInTextField = e.target.value.trim();

        setDisableSubmit(false);

        setBook(prev => {
            return {
                ...prev,
                description : {
                    ...prev.description,
                    validationFailed : valueInTextField.length === 0,
                    value: valueInTextField
                }
            }
        });
    };

    const disappearAlert= (delta) => {
        setTimeout(()=>{
            setAlertConfig(prev=>{
                return {
                    ...prev,
                    show: false
                }
            });
        }, delta);
    };

    const addBookToInventory =  async (event) => {

        setDisableSubmit(true);

        try {
            const response = await axios({
                url : "http://localhost:3001/bookstore/v1/book",
                method: "post",
                headers :{
                    "Content-Type" : "application/json"
                },
                data : {
                    "isbn" : book.isbn.value,
                    "title" : book.title.value,
                    "author" :{
                        
                        author_id : book.author.value
                    },

                    "genre":{
                        genre_id : book.genre.value
                    },
                    "genre_id": book.genre.value,
                    "publication_date" : book.publicationdate.value,
                    "price" : book.price.value,
                    "description" : book.description.value
                }
            });


            //event.target.reset();

            console.log(response.data);

            setAlertConfig({
                show: true,
                severity: "success",
                msg: response.data.message
            });

            disappearAlert(5000);

            

        } catch (error) {
            console.log(error);
            setDisableSubmit(false);

            if("response" in error &&  "message" in error.response.data){
                setAlertConfig({
                    show: true,
                    severity: "error",
                    msg: error.response.data.message
                });
            }
            else{
                setAlertConfig({
                    show: true,
                    severity: "error",
                    msg: "Something went wrong, please try after sometime"
                });
            }

            disappearAlert(10000);

        }

    };

    const handleSubmit = event => {
        event.preventDefault();

        addBookToInventory(event);

        return false;
    };


    return (
        <div>
            <Box>
                <Container maxWidth="sm">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                            <Typography variant="h5">
                                Add Books
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField variant="standard" label= "ISBN" required error={book.isbn.validationFailed} onChange={handleISBN}
                                helperText={book.isbn.validationFailed ? book.isbn.helperText : null} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="standard" label="Title" required onChange={handleBookTitle} error={book.title.validationFailed} helperText={book.title.validationFailed ?  book.title.helperText : null} />
                            </Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="selectauthor">Select Author</InputLabel>
                                    <Select labelId="selectauthor" label="Select Author" onChange={handleAuthor} onClose={handleAuthorOnClose} 
                                    error={book.author.validationFailed}  >
                                        {
                                            authorList.map(item=>{
                                                return (
                                                    <MenuItem value={item.author_id} key={item.author_id}>
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>    
                            </Grid >
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="selectgenre">Select Genre</InputLabel>
                                    <Select labelId="selectgenre" label="Select Genre" onChange={handleGenre} onClose={handleGenreOnClose} error={book.genre.validationFailed}>
                                        {
                                            genreList.map(item=>{
                                                return <MenuItem value={item.genre_id} key={item.genre_id} >{item.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 
                                <LocalizationProvider dateAdapter={AdapterMoment} >
                                    <DatePicker label="Publication Date" format="DD-MM-YYYY" onChange={handlePublicationDate}  defaultValue={moment()} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 
                                <TextField defaultValue={0} type="number" variant="outlined" label="Price" required onChange={handlePrice} 
                                error={book.price.validationFailed} helperText={book.price.validationFailed ? book.price.helperText: null} 
                                InputProps={{startAdornment:(
                                <InputAdornment position="end">
                                <Icon>
                                    <CurrencyRupeeIcon />
                                </Icon>
                            </InputAdornment>  
                                )}}/> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth  label="Description"  inputProps={{maxLength: 255}} multiline minRows={2} variant="outlined" required onChange={handleDiscription} error = {book.description.validationFailed} helperText={book.description.validationFailed ? book.description.helperText: null} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                
                                        <Button type ="submit" style={{minWidth:"200px"}} variant="outlined" size="large" 
                                        disabled={ disabledSubmit || book.isbn.validationFailed || book.title.validationFailed } >
                                            Add
                                        </Button>    
                                </Grid>    
                        </Grid>
                    </form>                    
                </Container>

                {
                    alertConfig.show ? 
                    <Container maxWidth="md">
                        <Grid container>
                            <Grid item sm={12}>
                                <Alert fullWidth severity={alertConfig.severity}>{alertConfig.msg}</Alert>
                            </Grid>
                        </Grid>
                        
                    </Container>
                    : null
                }
                
            </Box>
        </div>
    );
}