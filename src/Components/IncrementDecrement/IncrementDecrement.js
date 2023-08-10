import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";


export default function IncrementDecrement({defaulValue, valueChangeEvent}){

    const [value, setValue] = useState(0);


    useEffect(()=>{
        if(defaulValue!== undefined && !isNaN(defaulValue)){
            setValue(defaulValue);
        }
    },[]);

    const onIncrementHandler = event => {
        
        console.log(value+1);

        if(valueChangeEvent!== undefined){
            valueChangeEvent(value+1);
        }
        setValue(value+1);
    };

    const onDecrementHandler = event => {

        console.log(value-1);
        
        if(valueChangeEvent!== undefined){
            valueChangeEvent(value-1);
        }

        setValue(value-1);
    };


    return(
        <Box sx={{display:"flex", flexDirection: "row"}}>
            <Button size="small" variant="outlined" onClick={onDecrementHandler} >-</Button>
            <TextField  inputProps={{readOnly: true, style: {textAlign: "center"}}} variant="outlined" size="small" sx={{width:"20%"}} value={value} />
            <Button size="small" variant="outlined" onClick={onIncrementHandler}>+</Button>
        </Box>
    )
};