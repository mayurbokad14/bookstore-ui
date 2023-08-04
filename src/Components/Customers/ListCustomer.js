import { Box, Card, CardContent, Container, Grid, Icon, InputAdornment, TableCell, TextField, Typography } from "@mui/material";
import { EmailOutlined, PhoneOutlined, SearchOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";


export function ListCustomer(){

    const [customerList,setCustomerList] = useState([]);
    
    let previousSearchValue = null;

    let timeoutId=null;


    const getCustomerList = async (searchVal)=> {


        try {

            let payload = {
                method: "get",
                url : "http://localhost:3001/bookstore/v1/customer"
            };

            if(searchVal !== null){
                payload["params"]={
                    name: searchVal
                };
            }
            
            const response = await axios(payload);
                    

            console.log(response.data);

            setCustomerList(response.data.data);

        } catch (error) {
            console.log(error);   
        }

    };

    useEffect(()=>{
        getCustomerList();
    },[]);


    const handleSearchName = (event) => {

        clearTimeout(timeoutId);

        const searchValue = event.target.value.trim();

        if(previousSearchValue !== searchValue){
            previousSearchValue=searchValue;
            timeoutId=setTimeout(()=>{
                getCustomerList(searchValue);
            },500);
        }

    };


    const renderContact = (item) => {
        return (
            <Card sx={{m:2}} key={item.customer_id}>
                <TableCell align="left">
                    <CardContent>
                        <Typography variant="h5" gutterBottom component="div">
                            {item.name}
                        </Typography>
                        
                        <Grid container  >
                            <Grid item md={1} >
                                    <Icon>
                                        <PhoneOutlined />
                                    </Icon>
                            </Grid>
                            <Grid item md={5}>
                                {item.phone_number}
                            </Grid>
                            <Grid item md={1}>
                                <Icon>
                                    <EmailOutlined />
                                </Icon>
                            </Grid>
                            <Grid item md={5}>
                                {item.email}
                            </Grid>
                            
                        </Grid>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography variant="body2" sx={{pt:"20"}}>
                                    {item.address}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </TableCell>
            </Card>
        );
    };
    
    return(
       <Box>
            <Container>
            <TextField onChange={handleSearchName}  fullWidth  sx={{m:4}} variant="outlined" label="Search Customers..." InputProps={{endAdornment: (
                    <InputAdornment position="end">
                        <Icon>
                            <SearchOutlined />
                        </Icon>
                    </InputAdornment>
                )}} />

                {
                    customerList.length === 0 ?
                        <Typography variant="h5">
                            No results Found
                        </Typography>
                    : null
                }

                {
                    customerList.map(item=>{
                        return renderContact(item)
                    })
                }
            </Container>
       </Box>
    );
     
}
