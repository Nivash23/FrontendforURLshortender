import React, { useEffect, useState } from "react";
import RegisterForm from './pageHandler/Registeration';
import Dashboard from "./pageHandler/Dashboard";
import LoginFrom from "./pageHandler/Login";
import ResetpasswordForm from "./pageHandler/ResetpasswordForm";
// import { Route, BrowserRouter, Routes } from "react-router-dom";
import './styles/App.css'

// const MessageContext = createContext();
function userReg() {
  const [isRegistered, setIsRegistered] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [iswrongpassword, setIswrongpassword] = useState(false);
  const [urlDAtA, setUrlDATA] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      <h1 id='nav'>URL Shortender Application</h1>
      {
        iswrongpassword ? (<ResetpasswordForm iswrongpassword={ iswrongpassword} setIswrongpassword={setIswrongpassword}/>): user ? (<Dashboard token={token} setIsRegistered={setIsRegistered} User={user} setUser={setUser} />) : isRegistered ?
          (<LoginFrom
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          User={user}
          setUser={setUser}
            token={token}
            urlDATA={urlDAtA}
            setUrlDATA={setUrlDATA}
            setToken={setToken}
            iswrongpassword={ iswrongpassword} setIswrongpassword={setIswrongpassword}
          />) :
          (<RegisterForm
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered} />)
      }
      

      
     
    </div>
  );
}
export default userReg;
