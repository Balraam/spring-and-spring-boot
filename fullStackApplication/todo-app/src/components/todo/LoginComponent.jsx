import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent(){
    const [username,setUsername]=useState('Captain');
    const [password,setPassword]=useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate=useNavigate()
    const Auth=useAuth()
    function handleUserchange(event){
        return(
            setUsername(event.target.value)
        )
    }
    function handlePasswordChange(event){
        return(
            setPassword(event.target.value)
        )
    }
   async function handleLogin(){
           if(await Auth.login(username,password)){
            navigate(`/welcome/${username}`)
           }
           else{
            setShowErrorMessage(true)
           }
    }
    return(
        <div className="Login">
            <h1>Time to login!</h1>
            {showErrorMessage && <div className='Failed'>Authentication Failed. please check credential</div>}
        <div className="LoginForm">
        <div>
            <label>User Name:</label>
            <input type="text" name="username" value={username} onChange={handleUserchange}/>
        </div>
        <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
    </div>
    <div>
        <button type="button" name="login" onClick={handleLogin}>login</button>
    </div>
    </div>
    </div>
    )
}