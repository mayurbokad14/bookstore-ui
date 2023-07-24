import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Container, Icon, InputAdornment, TableCell, TextField, Typography } from "@mui/material";

import {SearchOutlined} from "@mui/icons-material";

import {getAuthor} from "../../API/author";


export function ListAuthor() {

    const [authorList, setAuthorList] = useState([]);
    const [searchText, setSearcText] = useState("");

    let timeoutId = null;


    const handleSearch = event => {

        clearTimeout(timeoutId);

        const name = event.target.value.trim();

        if(name.length > 0){

            if(searchText !== name){
                timeoutId=setTimeout(()=>{
                    
                    getAuthor(name).then(response=>{
                        setAuthorList(response.data.data)
                    }).catch(error=>{
                        console.log(error);
                    });

                    setSearcText(name);
                }, 500);
            }
        }
        else{
            if(searchText !== name){
                getAuthor();
            }
        }
        
    };


    /* async function getAuthor(searchVal) {
        
        let payload = {
            url: "http://localhost:3001/bookstore/v1/author",
            method: "get"
        };

        if(searchVal!==null && searchVal!== ""){
            payload["params"] = {
                name: searchVal
            };
        }

        try {

            const response = await axios(payload);
            console.log(response.data);

            setAuthorList(response.data.data);
            
        } catch (error) {
            console.log("Something went wrong");
        }

                
    }; */

    const temp_getAuthor = async () => {
        const response = getAuthor();
    };


    function callWhenInitialised() {

        //getAuthor();

        temp_getAuthor();


        getAuthor().then(response=>{
            setAuthorList(response.data.data);
        }).catch(error=>{
            console.log("Something went wrong");
            console.log(error);
        });

    }


    useEffect(callWhenInitialised, [])


    return (
        <Box>
            <Container>
                
                <TextField onChange={handleSearch} fullWidth  sx={{m:4}} variant="outlined" label="Search Authors..." InputProps={{endAdornment: (
                    <InputAdornment position="end">
                        <Icon>
                            <SearchOutlined />
                        </Icon>
                    </InputAdornment>
                )}} />

                {
                    authorList.length === 0 ?
                        <Typography variant="h5">
                            No results Found
                        </Typography>
                    : null
                }
                
                {
                    authorList.map(item => {
                        return (
                            <Card sx={{ m: 2 }} >
                                <TableCell align="left" >
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" >
                                            {item.bio}
                                        </Typography>
                                    </CardContent>
                                </TableCell>
                            </Card>
                        );
                    })
                }

            </Container>
        </Box>

    );

}