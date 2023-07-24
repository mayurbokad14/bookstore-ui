import axios from "axios";


export async function getAuthor(searchVal) {
        
    let payload = {
        url: "http://localhost:3001/bookstore/v1/author",
        method: "get"
    };

    if(searchVal!==null && searchVal!== ""){
        payload["params"] = {
            name: searchVal
        };
    }


    const response = await axios(payload);
    console.log(response.data);

    return response;
            
};

export const addAuthor = async (author)=>{
    const response = await axios({
        url : "http://localhost:3001/bookstore/v1/author",
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        data: {
            name: author.name.value,
            bio: author.bio.value
        }
    });

    return response;
};