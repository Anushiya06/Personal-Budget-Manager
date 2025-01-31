import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css.css"
const Login=()=>{
    var[email,setEmail]=useState("")
    var[password,setPassword]=useState("")
    var navigate=useNavigate()
    const handleLogin= async (event)=>{
        event.preventDefault()
console.log("Event Triggered")
try{const req= await axios.post("http://localhost:3004/login",{
    email:email,
    password:password
}) 
alert(req.data.message);
    if (req.data.IsLoggedIn) {
        navigate("/home");
    }
}
catch(err){console.log(err)
    }}
    return(
        <div style={{ textAlign: "center" }}>

            <h1 >Login</h1>
            <form className="container" method="POST" onSubmit={handleLogin}>
                <div>
            Email: 
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br /><br />
            Password:
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <br /><br />
            <button className="button" type="submit">LOGIN</button>
            </div>
            </form>
        </div>
    )
}
export default Login;