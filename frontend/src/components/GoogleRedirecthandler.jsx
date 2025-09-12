import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../token";

function RedirectGoogleAuth(){

    const navigate = useNavigate();

    useEffect(()=>{
        console.log("redirect mounted successfully");

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');

        console.log("QueryParms :",window.location.search);

        if(accessToken){
            console.log("accessToken Found",accessToken);
            localStorage.setItem(GOOGLE_ACCESS_TOKEN,accessToken);

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            axios.get('http://localhost:8000/api/auth/user')
                .then(response =>{
                    console.log('User Data ',response.data);
                    navigate('/');
                })
                .catch(error =>{
                    console.error('Error verifying Token ',error.response ? error.response.data : error.message);
                    navigate('/login')
                });
        }else{
            console.log("No Token found in url");
            navigate('/login')
        }
    },[navigate])

    return <div>Logging In .....</div>
} export default RedirectGoogleAuth;