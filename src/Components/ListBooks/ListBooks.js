import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


// function ListBooks(maxItems, minItems)

function ListBooks({maxItems}){

    const [bookList, setBookList] = useState(null);
    const [filteredBookList, setFilteredBookList] = useState(null);
    const [execute, setExecute ] = useState(null); 
    const [backendDown, setBackendDown] = useState(false);

    const filterList = event => {

        if(execute!==null){
            clearTimeout(execute)
        }

        let temp = setTimeout(()=>{
            getBookList(event.target.value)
        }, 500);

        setExecute(temp);

    };


    const getBookList = async (temp) => {

        let payload = {
            method: "get",
            url: "http://localhost:3001/v1/api/book"
        };

        if(temp !== null){
            payload["params"] ={
                name : temp
            };
        }

        if(maxItems !== null ) {
            payload["params"]["maxItems"] = maxItems;
        }

        try {

            const response = await axios(payload);

            console.log(response.data);

            setBookList(response.data);

            /* if(maxItems !== null && typeof(maxItems) === 'number' && maxItems > 0 ){
                setFilteredBookList(response.data.slice(0,maxItems));
            }
            else{
                setFilteredBookList(response.data);
            } */

            setBackendDown(false);
            setFilteredBookList(response.data);
            
        } catch (error) {
            console.log(error);
            setBackendDown(true);
        }

        

    };

    useEffect(
        () => {
            console.log("Component is loaded");

            getBookList();
        }, []
    );
    return (
        <div>

           
            <TextField variant="outlined" label="Type to Search" onChange={filterList} />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="Books List">
                    <TableHead>
                        <TableRow>
                            <TableCell>Isbn</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {
                        filteredBookList === null ? filteredBookList : 
                        filteredBookList.map(b=>{
                            return (
                                <TableRow key={b.isbn}>
                                    <TableCell>{b.isbn}</TableCell>
                                    <TableCell>{b.name}</TableCell>
                                    <TableCell>{b.description}</TableCell>
                                    <TableCell>{b.price}</TableCell>
                                    <TableCell>{b.quantity}</TableCell>
                                </TableRow>
                            );
                        })
                    }

                    </TableBody>
                </Table>
            </TableContainer>

            {backendDown ? <h1>Backend is down</h1> : null }
            
        </div>
    );
}
export default ListBooks;