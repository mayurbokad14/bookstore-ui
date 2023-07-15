import { Button } from "@mui/material";
import { useEffect, useState } from "react";



function CreateBook(){
    
    const [count, setCount] = useState(0);

    const tempFunction = x => {
        return x+1;
    };

    const handleClick = () => {
        console.log(count);

        setCount(tempFunction);

    };


    useEffect(()=>{
        console.log("Create book component initialised");
    },[]);


    useEffect(() =>{
        console.log("Value of count is changed " + count);
    }, [count]);
    
    return (
        <div>
            <Button onClick={handleClick} variant="outlined" >Click me</Button>
            <p>{count}</p>
        </div>
    );
}

export default CreateBook;