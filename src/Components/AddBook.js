import { Box, Button, Container, Grid, Icon, InputAdornment, TextField, Typography } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


export default function AddBook(){

    return(
        <div>
            <Box>
                <Container maxWidth="sm">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                        <Typography variant="h5">
                            Add Books
                        </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField variant="standard" label= "ISBN"/>     
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="standard" label="Title"/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <TextField   label="Author"  variant="outlined"/>
                        </Grid >
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <TextField variant="outlined" label="Genre"/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DatePicker label="Publication Date" />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 
                            <TextField type="number" variant="outlined" label="Price"  InputProps={{startAdornment:(
                            <InputAdornment position="end">
                            <Icon>
                                <CurrencyRupeeIcon />
                            </Icon>
                        </InputAdornment>  
                            )}}/> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth  label="Description"  inputProps={{maxLength: 255}} multiline minRows={2} variant="outlined"/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button style={{minWidth:"200px"}} variant="outlined" size= "large">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}