import axios from "axios";
import {token} from './tokenServices'

const url="https://servicios1.ingetec.com.co/Pruebas%20API/API_BILLD"
  


 export async function getBill(customerID){
    try{
        let data=[];
           
         console.log( )
             
        const response= await axios({
            url:`${url}/api/getbill/${customerID}`,
            method:'GET',
            headers: { Authorization: `Bearer ${await generateToken(url)}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}
export async function addBilld(dataBilld){
    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/addBills`,
            method:'POST',
            data:dataBilld,
            headers: { Authorization: `Bearer ${await generateToken(url)}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}

export async function deleteBilld(billID){
    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/deleteBilld/${billID}`,
            method:'DELETE',
            headers: { Authorization: `Bearer ${await generateToken(url)}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}

async function generateToken(url){
    
    let tokens = await token(url)
   
    return tokens.jwtToken
      
}