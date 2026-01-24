import axios from "axios";
import { config } from "./config";

export const registerUser = async (user) => {
    try{
        const url = `${config.server}/register`;

        const response = await axios.post(url, user);
        return response.data;
    }catch(error){
        console.log('exception' , error);
        
    }
}

export const loginUser = async (user) => {
    try{
        const url = `${config.server}/login`;
        const response = await axios.post(url, user);
        return response.data;
    }catch(error){
        console.log('exception' , error);
    }
    
}