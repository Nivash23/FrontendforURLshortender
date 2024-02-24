import React, { useState } from 'react'
import '../styles/App.css'

function Dashboard({user,setUser,setIsRegisterd}) {
  const [formData, setFormData] = useState({

    longurl: "",
    name:"",
  })
  const token = localStorage.getItem('token');
  const [urldata, setUrldata] = useState([]);
  const [datacode, setDatacode] = useState();
  
  const URLhandler =async (e) => {
    e.preventDefault();
    const URlData = {
      LongURL: formData.longurl,
      Name: formData.name,
    }
    const response = await fetch('https://backendforurlshortender.onrender.com/api/Urlshort', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(URlData),
  
    })
    const data1 = await response.json();
    setUrldata(data1.urlData[0].ShortedURLs);
    if (response.status == 200)
    {
      setFormData({
        longurl: "",
        name:""
      })
      }
  }
  return (
    <div>
      <div id='formcontainer'>
        <button id='logbut' onClick={() => {
          setUser(null);
          setIsRegisterd(true);
          localStorage.clear();
        }}>logout</button>

      <h3>URL Shortender</h3>
      <form onSubmit={URLhandler}>
        <div id='longurl'>

        <label>Long URL :</label>
        <input type='text'
          placeholder='Long URL...'
              value={formData.longurl}
              required
          onChange={(e) => { setFormData({ ...formData, longurl: e.target.value }) }} />
        </div>
        <div id='shortname'>
          <label>ShortName :</label>
          <input type='text'
            placeholder='ShortName for your Url...'
              value={formData.name}
              required
            onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
          />

        </div>
        <button type='submit'>Generate</button>
      </form>
      </div>
      <div id='Urlcontainer'>
        <table border='2'>
          <thead >
            <tr>
              <th>Id</th>
              <th>LongUrl</th>
              <th>ShortUrl</th>
            </tr>
          </thead>
          <tbody >
            {urldata?
              urldata.map((datas, index) => (
                
            <tr key={index} >
              <td>{index}</td>
                  <td>{datas.LongURL}</td>
                  
                  <td ><a href={`http://127.0.0.1:3005/api/RedirectTo?code=${datas.code}`}>{datas.Name }</a></td>
            </tr>
              )):null
            }
                

          </tbody>
       </table>

      </div>
    </div>
  )
}

export default Dashboard
