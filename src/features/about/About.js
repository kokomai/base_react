import React, { useEffect, useState } from 'react';
import useReq from '../../app/request';



export default function About() {
  const req = useReq();

  const [list, setList] = useState([]);
  const [isCall, setIsCall] = useState(true);

  useEffect(()=> {
    req.post({
      url : "/api/user/getData",
      success: function(data) {
        setList(data);
      }
    });
  }, [isCall])

  function insideClick(d) {
    alert("click! :: " + d);
  }

  return (
    <div>
      {
        list.map((data, idx)=> (
          <div key={"test" + idx} onClick={()=>{insideClick(data.key)}}>
            <p>random : {data.key}</p>
            <p>idx : {idx}</p>
            <hr></hr>
          </div>
        ))
      }
      <button onClick={()=>{setIsCall(!isCall)}}> generate new list </button>
    </div>
  );
}
