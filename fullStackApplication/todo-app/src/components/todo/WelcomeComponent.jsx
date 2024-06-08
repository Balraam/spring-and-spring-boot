import { useState } from "react"
import { Link,useParams } from "react-router-dom"
import { retrieveHelloBean} from "./api/HelloWorldApiService"
import { useAuth } from "./security/AuthContext"
export default function WelcomeComponent(){
    const {username}= useParams()
    const [message,setMessage]=useState(null)
     const token=useAuth().token
    function CallHelloWorldRest(){
        retrieveHelloBean(token)
        .then((response) => successfullyCall(response))
        .catch((error) => ErrorResponse(error))
        .finally(() => console.log("cleanup"))
    }
    function successfullyCall(response){
        setMessage(response.data.message)
    }
    function ErrorResponse(error){
        console.log(error)
    }
    return(
        <div className='welcomeComponent'>
            <div>
            <h1>welcome {username}</h1>
        </div>
        <div>
        manage your todos- <Link to ='/todo'>Go here</Link>
        </div>
        <div>
            <button className="btn btn-success m-5" name="CallHelloWorldRest" onClick={CallHelloWorldRest}>Call hello world rest</button>
        </div>
        <div>{message}</div>
        </div>
    )
}