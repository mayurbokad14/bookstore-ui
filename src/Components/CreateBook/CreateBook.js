import axios from "axios";
import { useState } from "react";



function CreateBook(){

    const [bookName, setBookName ] = useState("");
    const [isbn, setIsbn] = useState("");
    const [description, setDescription] = useState("");
    const [price, SetPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const submitRequest = async (e) => {

        //e.preventDefault();

        try {
            //send api request to spring boot application
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/v1/api/book",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    "isbn": isbn,
                    "name": bookName,
                    "description": description,
                    "price": price,
                    "quantity": quantity
                }
            });

            console.log(response.data);

            //reset the form, clear all fields
            e.target.reset();
        } catch (error) {
            console.log(error);
        }

        //e.preventDefault();
        return false;
    };

    const preSubmit = (e) => {
        e.preventDefault();
        return submitRequest(e);
    };

    return (
        <div>
            <form onSubmit={preSubmit } >
                <input type="text" placeholder="ISBN" onChange={e=> setIsbn(e.target.value)}  />
                <input type="text" placeholder="Name of the Book" onChange={e=> setBookName(e.target.value)} />
                <input type="text" placeholder="Book Description" onChange={e=> setDescription(e.target.value)} />
                <input type="text" placeholder="Book Price" onChange={e=> SetPrice(e.target.value)} />
                <input type="text" placeholder="Quantity in inventory" onChange={e=> setQuantity(e.target.value)} />
                <input type="submit" value="Create Book" />
            </form>

            
        </div>
    );
}

export default CreateBook;