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

            <input type="text" placeholder="type to search book" onChange={filterList} />
            
            <table border="1">
                <thead>
                    <tr>
                        <th>Isbn</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookList === null ? bookList : 
                        bookList.map(b=>{
                            return (
                                <tr key={b.isbn}>
                                    <td>{b.isbn}</td>
                                    <td>{b.name}</td>
                                    <td>{b.description}</td>
                                    <td>{b.price}</td>
                                    <td>{b.quantity}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            
        </div>

    );
}

export default ListBooks;