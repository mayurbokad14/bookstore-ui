import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import validator from "validator";

export default function AddCustomer(){

    const [customer, setCustomer] = useState({
        name: {
            value: null,
            validationFailed: false,
            helperText: "Invalid Input"
        },
        phone: {
            value: null,
            validationFailed: false,
            helperText: "Not a Valid phone number"
        },
        email: {
            value: null,
            validationFailed: false,
            helperText: "Not a valid email address"
        },
        address: {
            value: null,
            validationFailed: false,
            helperText: "Invalid Input"
        },
    });

    const handleName = (event) => {
        setCustomer(prev =>{
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

    const handleAddress = (event) => {
        setCustomer(prev =>{
            return {
                ...prev,
                address: {
                    ...prev.address,
                    value: event.target.value.trim(),
                    validationFailed: event.target.value.trim().length == 0
                }
            };
        });
    };

    const handleEmail = (event) => {
        setCustomer(prev =>{
            return {
                ...prev,
                email: {
                    ...prev.email,
                    value: event.target.value.trim(),
                    validationFailed: !(isEmail(event.target.value.trim()))
                }
            };
        });
    };

    const handlePhone = (event) => {
        setCustomer(prev =>{
            return {
                ...prev,
                phone: {
                    ...prev.phone,
                    value: event.target.value.trim(),
                    validationFailed: ! validator.isMobilePhone(event.target.value.trim())
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
                                    Add New Customer
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Name" required onChange={handleName} error={customer.name.validationFailed} helperText={customer.name.validationFailed ? customer.name.helperText : null}  />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Phone" required onChange={handlePhone} error={customer.phone.validationFailed} helperText={customer.phone.validationFailed ? customer.phone.helperText : null} />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Email" required onChange={handleEmail} error={customer.email.validationFailed} helperText={customer.email.validationFailed ? customer.email.helperText : null} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth={true} variant="standard" label="Address" required onChange={handleAddress} error={customer.address.validationFailed} helperText={customer.address.validationFailed ? customer.address.helperText : null} />
                            </Grid>
                            
                            <Grid item xs={12} md={12}>
                                <Box display="flex"justifyContent="flex-end">
                                    <Button style={{minWidth:"200px"}} variant="outlined" size="large"  disabled={
                                        customer.name.validationFailed || customer.email.validationFailed || customer.phone.validationFailed || customer.address.validationFailed
                                    }>Add</Button>
                                </Box>
                                
                            </Grid>
                            
                        </Grid>
                </Container>
            </Box>
        </div>
    );

};

