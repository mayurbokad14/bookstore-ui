import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


// function ListBooks(maxItems, minItems)

function ListBooks({maxItems}){

    const [bookList, setBookList] = useState(null);
    const [filteredBookList, setFilteredBookList] = useState(null);
    const [execute, setExecute ] = useState(null); 
    const [backendDown, setBackendDown] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchFilter, setSearchFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filterList = event => {

        if(execute!==null){
            clearTimeout(execute);
        }
        setSearchFilter(event.target.value);

        let temp = setTimeout(()=>{
            
            console.log(event.target.value);
            getBookList();
        }, 500);

        setExecute(temp);

    };


    const getBookList = async (pageNumber) => {

        const pageNum = typeof(pageNumber) === 'undefined' ? 1 : pageNumber;

        let payload = {
            method: "get",
            url: "http://localhost:3001/v1/api/book",
            params : {
                pageNum: pageNum
            }
        };

        console.log(searchFilter);

        if(searchFilter !== null) {
            payload["params"]["name"] = searchFilter;
        }

        if(maxItems !== null ) {
            payload["params"]["maxItems"] = maxItems;
        }

        console.log(payload);

        try {

            const response = await axios(payload);

            console.log(response.data);

            setBookList(response.data.content);

            /* if(maxItems !== null && typeof(maxItems) === 'number' && maxItems > 0 ){
                setFilteredBookList(response.data.slice(0,maxItems));
            }
            else{
                setFilteredBookList(response.data);
            } */

            setBackendDown(false);
            setFilteredBookList(response.data.content);
            const r = response.data.total % response.data.pageable.size;
            const q = parseInt(response.data.total / response.data.pageable.size)
            const totalPages = q + (r > 0 ? 1 : 0);
            setTotalPages(totalPages);
            
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

    //creates a view
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

            <div>
                <Pagination count={totalPages} color="primary" page={currentPage} onChange={(e, p)=>{
                    getBookList(p);
                    setCurrentPage(p);
                }} />
            </div>

            {backendDown ? <h1>Backend is down</h1> : null }
            
        </div>
    );
}
export default ListBooks;