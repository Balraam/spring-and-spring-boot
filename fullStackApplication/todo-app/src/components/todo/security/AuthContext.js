import { createContext, useContext, useState } from "react";
import { clientUrl } from "../api/ApiClient";
import { basicAuth, basicJwtAuth } from "../api/AuthenticationApiService";


export const AuthContext=createContext()
export const useAuth=() => useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated]=useState(false)
    const [username,setUsername]=useState(null)
    const [token,setToken]=useState(null)
    // function login(username,password){
    //     if(username==='Captain' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //        }
    //        else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //        }
    // }
    // async function login(username,password){
    //     const baToken='Basic '+ window.btoa(username+":"+password)
    //     try{
    //     const response =await basicAuth(baToken)

    //     if(response.status==200){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         clientUrl.interceptors.request.use(
    //             (config) => {
    //                 console.log('interceptor and adding token')
    //                 config.headers.Authorization=baToken
    //                 return config
    //             }
    //         )
    //         return true
    //         }
    //         else{
    //         logout()
    //         return false
    //         }
    //     }catch{
    //         logout()
    //         return false
    //     }
    // }
    async function login(username,password){
        try{
        const response =await basicJwtAuth(username,password)
        const jwtToken='Bearer '+response.data.token
        if(response.status==200){
            setAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            clientUrl.interceptors.request.use(
                (config) => {
                    console.log('interceptor and adding token')
                    config.headers.Authorization=jwtToken
                    return config
                }
            )
            return true
            }
            else{
            logout()
            return false
            }
        }catch{
            logout()
            return false
        }
    }
    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,setAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}