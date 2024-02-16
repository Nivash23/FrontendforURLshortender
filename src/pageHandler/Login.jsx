import React, { useState } from "react";
import "../styles/App.css";
// import { BrowserRouter, Link, Navigate } from "react-router-dom";
import "../App";
import RegisterForm from "./Registeration";

const LoginFrom = ({ isRegistered, setIsRegistered, User, setUser, token, setToken,iswrongpassword,setIswrongpassword }) => {
  const initialstateerrors = {
     username: { required: false },
     password:{required:false},
    
  }

  const [errors, setErrors] = useState(initialstateerrors)

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = initialstateerrors;
    let hasError = false;
    
    // const { setIsRegistered} = useContext(MessageContext);
    const Loginbody = {
      username: loginFormData.username,
      password: loginFormData.password,
    };
    if (loginFormData.username == "") {
      errors.username.required = true;
      hasError = true;
    }
    if (loginFormData.password == "") {
      // errors.password.required = true;
      errors.password.required = true;
      hasError = true;
    }
    // const [loginFormData, setLoginFormData] = useState({
      //   username: "",11111111111111111
      //   password: "",
      // });
      
      if (!hasError)
      {
        const commonerr2 = document.getElementById('commonerror');
           commonerr2.innerText = '';
        
      setLoading(true);
      const response = await fetch(
        "https://backendforurlshortender.onrender.com/api/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Loginbody),
        }
      );
      const data = await response.json();
        if (response.status == 200) {
  
        const contain = document.getElementById('sucess');
        contain.innerHTML = [
  `<div class="alert alert-success" id='s' role="alert">
          User LoggedIn Sucessfully..
        </div>`
  
        ]
        
  
  
        console.log("User Login sucessfully..");
        console.log(data);
        setLoginFormData({
          username: "",
          password: "",
        });
        setToken(data.token);
        setTimeout(() => {
          
          setUser(data); 
        },2000)
        localStorage.setItem('user',JSON.stringify(data));
        localStorage.setItem('token',data.token);
        setLoading(false);      
        // setIsRegistered(true);
      } else {
        console.log("Invalid username or password");
        setLoading(false);
        const commonerr1 = document.getElementById('commonerror');
        commonerr1.innerText = `${data.message}`;

        console.log(data);
      }
    }
      else {
         const commonerr1 = document.getElementById('commonerror');
           commonerr1.innerText = 'Please Enter the required Field';
    }
  };
  return (
    <div>
      <div id='sucess'></div>
         
    <div id="logincontainer">
      <div>
        <h2>LOGIN PAGE</h2>
        <form onSubmit={handleLogin} autoComplete="on">
          <div id="username">
            <label>Username :</label>
              <input
                name="username"
              type="email"
              placeholder="Email..."
              value={loginFormData.username}
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  username: e.target.value,
                })
              }
              />
            </div>
            {errors.username.required?
               (<span className="text-danger">Email is required </span>):null
            }
          <div id="password">
            <label>Password :</label>
              <input
                name="password"
              type="password"
              placeholder="password..."
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  password: e.target.value,
                })
              }
              />
            </div>
            {errors.password.required?

              (<span className="text-danger">Password is required </span>):null
            }
          {loading ? (
            <div className="spinner-border" id="load" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            ) : null}
            <div>
          <button id='loginbut' type="submit">Login</button>

            </div>
          <div className="text-danger" id='commonerror'></div>
          <div id='pageswitch'>
              Create new Account ? please <a onClick={() => { setIsRegistered(false) }}>Register</a>
            </div>
            <p id='resetbut'   onClick={() =>{setIswrongpassword(true)}}>Forgot Password?</p>
        </form>
      </div>
    </div>
    </div>
  );
};
export default LoginFrom;
