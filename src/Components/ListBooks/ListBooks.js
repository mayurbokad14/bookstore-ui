import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function ListBooks(){

    const [bookList, setBookList] = useState(null);
    const [filteredBookList, setFilteredBookList] = useState(null);
    const [execute, setExecute ] = useState(null); 

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

        const response = await axios(payload);

        console.log(response.data);

        setBookList(response.data);
        setFilteredBookList(response.data);

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
                        bookList === null ? bookList : 
                        bookList.map(b=>{
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
            
        </div>
    );
}
export default ListBooks;