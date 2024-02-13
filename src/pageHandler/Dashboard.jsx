import React, { useEffect, useState } from "react";
import "../App";
import "../styles/App.css";
import axios from "axios";
function Dashboard({ User, setUser, setIsRegistered}) {
  const token = localStorage.getItem('token');

  const [entrydata, setEntrydata] = useState({
    Amount: "",
    Description: "",
  });
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [entries, setEntries] = useState([]);
  const [entrylist, setEntrylist] = useState(false);
  // const entrylisthandle = () => {
  //   const listcontain = document.getElementById('entrieslist');
  //   if (entrylist)
  //   {
  //     console.log(entries);
  //     listcontain.style.display = 'none';
  //     setEntrylist(false);
  //   }
  //   else {
  //     listcontain.style.display = 'block';
  //     setEntrylist(true);
  //   }
  // }

  const Datahandler = async (e) => {
    console.log(token)
    e.preventDefault();
    setLoading(true);

    const entrybody = {
      Amount: entrydata.Amount,
      Description: entrydata.Description,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "https://backendforurlshortender.onrender.com/api/entry/",
        entrybody,
        config
      );

      if (response.status == 200) {
      alert("entry saved sucessfully...");
      setLoading(false);
        console.log(response.data);
        setEntrydata({ Amount: "", Description: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const EntriesHandler = async (e) => {
    e.preventDefault();
    setLoading1(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get('https://backendforcapstone-cokw.onrender.com/api/entry/', config);
      console.log('All Entries..');
      console.log(response.data);
      setEntries(response.data);
      if (response.status == 200)
      {
        setLoading1(false);
        }
      // setLoading(false);
      
    }
    catch (e)
    {
      console.log(e);
    }
  }

//   useEffect(() => {
//     EntriesHandler();
// },[])

  return (
    <div>
      <div id="head">
        <p>
          Welcome,{User.name}{" "}
          <button
            id="logbut"
            onClick={() => {
              setUser(null);
              setIsRegistered(true);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </p>
      </div>
      <div id="dashcontainer">
        <form onSubmit={Datahandler}>
          <h3>History Entry:</h3>
          <div id="amt">
            <label htmlFor="amount">Amount :</label>
            <input
              id="amount"
              type="number"
              placeholder="Amount..."
              value={entrydata.Amount}
              onChange={(e) => {
                setEntrydata({ ...entrydata, Amount: e.target.value });
              }}
              required
            />
          </div>
          <div id="dec">
            <label htmlFor="desc">Description :</label>
            <input
              id="desc"
              type="text"
              placeholder="Description...."
              value={entrydata.Description}
              onChange={(e) => {
                setEntrydata({ ...entrydata, Description: e.target.value });
              }}
              required
            />
          </div>
          {loading ? (
            <div className="spinner-border" id="load1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : null}
          <div id="savebut">
            <button type="submit">Save</button>
          </div>

        </form>
        {loading1 ? (
            <div className="spinner-border" id="load2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : null}
         <button id='historybut' onClick={EntriesHandler} >View History</button>
      </div>
      <div id='listcontain'>

      <ul>

          {
            entries.map(entry => 
              <li key={entry._id}>Rs.{entry.Amount}, {entry.Description }</li>
            )
              
          }
      </ul>
      </div>
      
      
    </div>
  );
}
export default Dashboard;
