import axios from "axios";
import { useEffect, useState } from "react";


function ListBooks(){

    const [bookList, setBookList] = useState(null);

    const getBookList = async () => {

        const response = await axios({
            method: "get",
            url: "http://localhost:3001/v1/api/book",
        });

        console.log(response.data);
        setBookList(response.data);

    };

    useEffect(
        () => {
            console.log("Component is loaded");

            getBookList();
        }, []
    );

    return (
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

    );
}

export default ListBooks;