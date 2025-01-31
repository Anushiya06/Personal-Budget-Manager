import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css.css";

const Signup = () => {
  var [firstname, setFirstname] = useState("");
  var [lastname, setLastname] = useState("");
  var [username, setUsername] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("Event Triggered");
    try {
      const req = await axios.post("http://localhost:3004/signup", {
        firstName: firstname,
        lastName: lastname,
        userName: username,
        email: email,
        password: password
      });
      alert(req.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup</h1>
      <form className="container" method="POST" onSubmit={handleSignup}>
        <div>
          <label>FirstName:</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required /><br /><br />
          <label>LastName:</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required /><br /><br />
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />
          <button className="button" type="submit">SIGNUP</button>
        </div>
      </form>
      <p>Already have an account?<a href="/login"> Login</a></p>
    </div>
  );
};

export default Signup;
