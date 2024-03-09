import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null);
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState([""]);


  function onUrlChange(index, value) {
    const newUrl = [...url];
    newUrl[index] = value;
    setUrl(newUrl);
  }

  function AddInputBox() {
    setUrl((c) => [...c, ""]);
  }

  function RemoveInputBox(index) {
    const newUrl = [...url];
    newUrl.splice(index, 1);
    setUrl(newUrl);
  }
  useEffect(()=>{
    setTimeout(()=>setResponse(""),2000);
  },[location]);

  async function submitHandler() {
    try {
      console.log(url);
      const res = await fetch("https://backend-vikram.vercel.app/location", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          "location":location,
          "url":url
        })
    });
      const value = await res.json();
      setResponse(value);
    } catch (error) {
      setResponse(`Error while fetching:${error.message}`);
    }

  }

  return (
    <><div className="container">

      <label htmlFor="location">Location:</label>
      <input type="text" placeholder='Enter location name e.g. library' id='location' onChange={(e) => { setLocation(e.target.value); console.log(location) }} />
      <br />
      {url.map((value, index) => {
        return (<>
        <label htmlFor="URL">{index}:</label>
          <input type='text' id="URL" key={index} placeholder='url:0' value={value} onChange={(e) => onUrlChange(index, e.target.value)} />
          <button onClick={AddInputBox}>+</button>
          <button onClick={()=>RemoveInputBox(index)}>-</button>
          <br />
        </>)
      })}






      <button onClick={submitHandler}>Submit</button>

    </div>
      {response}

    </>
  )
}

export default App
