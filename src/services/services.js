import axios from "axios";
import {token} from './tokenServices'

const url="https://servicios1.ingetec.com.co/Pruebas%20API/API_GET_CUSTOMERS"


 export async function getCustomers(){
    try{
        let data=[];
           
         console.log( )
             
        const response= await axios({
            url:`${url}/api/getCustomers`,
            method:'GET',
            headers: { Authorization: `Bearer ${await generateToken(url)}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
        return e
    }

}

async function generateToken(url){
    
    let tokens = await token(url)
   
    return tokens.jwtToken
      
}