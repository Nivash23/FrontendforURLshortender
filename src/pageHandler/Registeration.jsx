import React, { useContext, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import App from "../App";
import "../styles/App.css";
// import { MessageContext } from "../App";
import LoginFrom from "./Login";



const RegisterForm = ({ isRegistered, setIsRegistered }) => {
  let initialstateerrors = {
    username: { required: false },
    name: { required: false },
    password: { required: false },
  };
  const [errors, setErrors] = useState(initialstateerrors);

  const [regbut, setRegbut] = useState(true);
  const [registerFormdata, setRegisterFormdata] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const { setIsRegistered, isRegistered } = useContext(MessageC
  const handleRegister = async (e) => {
    e.preventDefault();
    let hashError = false;
    let errors = initialstateerrors;
    const registerbody = {
      username: registerFormdata.username,
      name: registerFormdata.name,
      password: registerFormdata.password,
    };
    if (registerbody.username == "") {
      errors.username.required = true;
      hashError = true;
    }
    if (registerbody.name == "") {
      errors.name.required = true;
      hashError = true;
    }
    if (registerbody.password == "") {
      errors.password.required = true;
      hashError = true;
    }
    setErrors(errors);
    if(!hashError)
    {
        const commonerr1 = document.getElementById('commonerror');
      commonerr1.innerText = '';
      // return console.log('please fill the required field');
      // const [loginFormData, setLoginFormData] = useState({
        //   username: "",
        //   password: "",
      // });
      
      const commonerr = document.getElementById('commonerror');
      commonerr.innerText = '';
      setLoading(true);
      const response = await fetch(
        "https://backendforurlshortender.onrender.com/api/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerbody),
        }
      );
      const data = await response.json();
      
      if (response.status == 200) {

            const contain = document.getElementById("sucess");
            contain.innerHTML = [
              `<div class="alert alert-success" id='s' role="alert">
              User Registered sucessfully
            </div>`,
            ];
      
            console.log("user created sucessfully..");
            console.log(data);
      
            setRegisterFormdata({
              username: "",
              name: "",
              password: "",
            });
            setLoading(false);
      
            setTimeout(() => {
              setIsRegistered(true);
            }, 2000);
      
            // isRegistered ? <LoginFrom /> : <RegisterForm />;
          } else {
        console.log("Error");
        let commonerr1 = document.getElementById('commonerror');
        commonerr1.innerText=`${data.message}`
        
        setLoading(false);
            console.log(data);
      }
    }
    else {
     let  commonerr = document.getElementById('commonerror');
      commonerr.innerText = 'please fill the required field';
       console.log('Please Enter the required Field');
    
  
    }
  };
  let isVerfied = false;
  
  
  
  return (
    <div>
      <div id="sucess"></div>

      <div id="container">
        <div>
          <h2>REGISTRATION PAGE</h2>
          <form onSubmit={handleRegister}>
            <div id="username">
              <label htmlFor="email">Username :</label>
              <input
                id="email"
                type="email"
                placeholder="Email..."
                value={registerFormdata.username}
                onChange={(e) =>
                  setRegisterFormdata({
                    ...registerFormdata,
                    username: e.target.value,
                  })
                }
              />
            </div>
            {errors.username.required ? (
              <span className="text-danger">Email is required </span>
              ) : null}
            <div id="name">
              <label htmlFor="name">Name :</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name..."
                value={registerFormdata.name}
                onChange={(e) =>
                  setRegisterFormdata({
                    ...registerFormdata,
                    name: e.target.value,
                  })
                }
                />
            </div>
            {errors.name.required ? (
              <span className="text-danger">Name is required </span>
              ) : null}
            <div id="password">
              <label htmlFor="pass">Password :</label>
              <input
                id="pass"
                type="password"
                placeholder="password..."
                value={registerFormdata.password}
                onChange={(e) =>
                  setRegisterFormdata({
                    ...registerFormdata,
                    password: e.target.value,
                  })
                }
                />
            </div>
            {errors.password.required ? (
              <span className="text-danger">Password is required </span>
              ) : null}
            {loading ? (
              <div className="spinner-border" id="load" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : null}
            <button id="regbut" type="submit">
              Register
            </button>
            <div className="text-danger" id='commonerror'></div>
            <div id="pageswitch">
              Already have an account ?{" "}
              <a
                onClick={() => {
                  setIsRegistered(true);
                }}
                >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
      <a href='#' onClick={() => {
        console.log(isVerfied);
      }}>Click</a>
    </div>
);
}
export default RegisterForm;
