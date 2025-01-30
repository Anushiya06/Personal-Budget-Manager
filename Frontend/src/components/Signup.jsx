import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css.css"
const Signup=()=>{
    var[firstname,setFirstname]=useState("")
    var[lastname,setLastname]=useState("")
    var[username,setUsername]=useState("")
    var[email,setEmail]=useState("")
    var[password,setPassword]=useState("")
    var navigate=useNavigate()
    const handleSignup= async (event)=>{
        event.preventDefault()
console.log("Event Triggered")
try{const req= await axios.post("http://localhost:3003/signup",{
    firstName:firstname,
    lastName:lastname,
    userName:username,
    email:email,
    password:password
})
alert(req.data)
navigate("/login")
}
catch(err){console.log(err)
    }}
    return(
        <div style={{ textAlign: "center" }}>

            <h1 >Signup</h1>
            <form className="container" method="POST" onSubmit={handleSignup}>
                <div>
            Firstname:
                    <input type="text" value={firstname} onChange={(e)=>setFirstname(e.target.value)} required/><br/><br/>
            LastName:
                    <input type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)} required/><br/><br/>
            Username: 
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/><br /><br />
            Email: 
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br /><br />
            Password:
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <br /><br />
            <button className="button" type="submit" onClick={handleSignup}>SIGNUP</button>
            </div>
            </form>
            Already have an account?<a href="/login">Login</a>
        </div>
    )
}
export default Signup;