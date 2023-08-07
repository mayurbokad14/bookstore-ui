import axios from "axios";

export async function listBooks(){
    const response = await axios({
        url: "http://localhost:3001/bookstore/v1/book",
        method: "get"
    });

    return response.data;

};