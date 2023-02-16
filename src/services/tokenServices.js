import axios from "axios";


export async function token(url){
    
    let playload={
        "username": "Unfinet",
        "password": "Unfinet2023"
      }

    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/Login/login`,
            method:'POST',
            data:playload
        })
        if(response.status===200)
         data=response.data
        return data

    }catch(e){
        console.log(e)
    }

}