import axios from "axios";

export const getGenres = async () => {

    const response = await axios({
        method: "get",
        url: "http://localhost:3001/bookstore/v1/genre"
    });

    console.log(response.data);

    return response;
};

export const addGenre = async (event) => {
    const response = await axios({
        url: "http://localhost:3001/bookstore/v1/genre",
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            name: genre.name.value
        }
    });
    return response;
};
