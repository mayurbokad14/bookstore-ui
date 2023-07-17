import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Container, Icon, InputAdornment, TableCell, TextField, Typography } from "@mui/material";

import {SearchOutlined} from "@mui/icons-material";


export function ListAuthor() {

    const [authorList, setAuthorList] = useState([]);

    async function getAuthor() {

        const payload = {
            url: "http://localhost:3001/bookstore/v1/author",
            method: "get"
        };

        const response = await axios(payload);

        console.log(response.data);

        setAuthorList(response.data.data);
    };

    function callWhenInitialised() {

        getAuthor();

    }


    useEffect(callWhenInitialised, [])


    return (
        <Box>
            <Container>
                
                <TextField fullWidth  sx={{m:4}} variant="outlined" label="Search Authors..." InputProps={{endAdornment: (
                    <InputAdornment position="end">
                        <Icon>
                            <SearchOutlined />
                        </Icon>
                    </InputAdornment>
                )}} />

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