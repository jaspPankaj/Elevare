import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "./token";

export const useAuthentication = () =>{
    const [isAuthorized,setAuthorized] = useState(false);

    useEffect(()=>{
         const auth = async () =>{
            const token= localStorage.getItem(ACCESS_TOKEN);
            const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

            console.log("ACCESS_TOKEN",token);
            console.log("GOOGLE_ACCESS_TOKEN",googleAccessToken);

            if(token){
                const decode = jwtDecode(token);
                const tokenExpiration = decode.exp;
                const now = Date.now() /1000;

                if(tokenExpiration < now){
                    await REFRESH_TOKEN();
                }else{
                    setAuthorized(true);
                }

            }else if(googleAccessToken){
                const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
                console.log("Google token is valid", isGoogleTokenValid);

                if(isGoogleTokenValid){
                    setAuthorized(true);
                }else{
                    setAuthorized(false);
                }
            }else{
                setAuthorized(false);
            }
         };

         auth().catch(()=> setAuthorized(false));
    },[]);


    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try{
            const res = await api.post('/api/token/refresh/',{
                refresh:refreshToken,
            });

            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                setAuthorized(true);
            }else{
                setAuthorized(false)
            }
        }catch (error){
            console.error('Error refreshing token ',error);
            setAuthorized(false);
        }
    };

    const validateGoogleToken = async (googleAccessToken)=>{
         try{
            const res = await api.post('/api/google/validate_token/',{
                access_token : googleAccessToken
            },{
                headers : {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Validate response", res.data);
            return res.data.valid;
           
        }catch (error){
            console.error('Error validating google token ',error);
            return false;
        }
    };

    const logout = () =>{
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
        setAuthorized(false);
        window.location.reload();

    }

    return {isAuthorized , logout}; 
}