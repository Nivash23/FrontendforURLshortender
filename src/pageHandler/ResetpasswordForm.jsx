import React, { useState } from "react";
import "../styles/App.css";

function ResetpasswordForm({ iswrongpassword, setIswrongpassword }) {
  const [loading, setLoading] = useState(false);

  const [passResetFormData, setPassResetFormData] = useState({
    email:"",
    Newpassword: "",
    confirmpassword: "",
  });
  let initialstateerrors = {
    email:{required:false},
    newpassword: { required: false },
    confirmpassword: { required: false },
  };
  const [errors, setErrors] = useState(initialstateerrors);
  const PassResetFormHandler = async (e) => {
    e.preventDefault();
    let errors = initialstateerrors;
    let haserror = false;

    const passResetbody = {
      username:passResetFormData.email,
      newpass: passResetFormData.Newpassword,
      confirmpass: passResetFormData.confirmpassword,
    };
    if (passResetFormData.email == "") {
      errors.email.required = true;
      haserror = true;
    }
    if (passResetFormData.Newpassword == "") {
      errors.newpassword.required = true;
      haserror = true;
    }
    if (passResetFormData.confirmpassword == "") {
      errors.confirmpassword.required = true;
      haserror = true;
    }
    if (passResetFormData.confirmpassword !== passResetFormData.Newpassword) {
      errors.confirmpassword.required = true;
      haserror = true;
    }

    setErrors(errors);
    if (!haserror) {
      const Commonerror = document.getElementById('commonerror');
      Commonerror.innerText = "";
      setLoading(true);
      const response = await fetch(
        "https://backendforurlshortender.onrender.com/api/Resetpass/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passResetbody),
        }
      );
      if (response.status == 200) {
        let msgtxt = document.getElementById("msg");
        msgtxt.innerText = "Password Reset sucessfully...";
        setPassResetFormData({
          email: "",
          Newpassword: "",
          confirmpassword:"",
        })

        setLoading(false);
        setTimeout(() => {
           msgtxt.innerText = "";
          
        }, 4000);
      }
    } else {
      let commonerr = document.getElementById("commonerror");
      setInterval(() => {
        
        commonerr.innerText = "";
        commonerr.innerText = "Please Enter the required Filed";
      }, 1000);

    }
  };
  return (
    <div>
      <div id="passResetContainer">
        <form onSubmit={PassResetFormHandler}>
          <div id='username'>

            <label>Email  </label>
            <input
              type="email"
              id="username1"
              placeholder="Enter the email..."
              value={passResetFormData.email}
              onChange={(e) => {
                setPassResetFormData({
                  ...passResetFormData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          {errors.email.required ? (
            <span id='rstmsg1'className="text-danger">Email is required </span>
          ) : null}
          <div id="newpass">
            <label>New Password </label>
            <input
              type="password"
              id="newpass"
              placeholder="Enter the Password..."
              value={passResetFormData.Newpassword}
              onChange={(e) => {
                setPassResetFormData({
                  ...passResetFormData,
                  Newpassword: e.target.value,
                });
              }}
            />
          </div>
          {errors.newpassword.required ? (
            <span id='rstmsg2' className="text-danger">Password is required </span>
          ) : null}
          <div id="confirmpass">
            <label>Confirm Password </label>
            <input
              type="password"
              id="confirmpass"
              placeholder="Enter the Password..."
              value={passResetFormData.confirmpassword}
              onChange={(e) => {
                setPassResetFormData({
                  ...passResetFormData,
                  confirmpassword: e.target.value,
                });
              }}
            />
          </div>
          {errors.confirmpassword.required ? (
            <span id='rstmsg3' className="text-danger">Confirm Password is required </span>
          ) : null}
          {loading ? (
            <div className="spinner-border" id="load" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : null}
          <button type="submit" id="resetpass">
            save
          </button>

          <p id='saveandlogin' onClick={() => {
              setIswrongpassword(false)}}>Login ?</p>
          <div className="text-danger" id="commonerror"></div>
      <p id="msg"></p>
        </form>
      </div>
    </div>
  );
}

export default ResetpasswordForm;
