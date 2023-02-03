import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar1 from "../Landinpage/Navbar";
import { useDispatch } from 'react-redux';
import './ad.css'

const AdminLogin = () => {
  const history = useHistory();
  const [usnam,setusnam] = useState('')
  const [eml,seteml] = useState('')
  const dispatch = useDispatch()
  const [data,setdata] = useState("admin")
  const addaduser = async(event) => {
    event.preventDefault();
    const res = await axios.get(`http://localhost:4000/admin?username=${usnam}&email=${eml}`);

    if(res.data.length > 0)
      {
        dispatch({
          type : "setTrue2"
        })
        localStorage.setItem('author',JSON.stringify(data));
        history.push("/admin/"+res.data[0].id);
      }
      else
      {
        console.log(usnam);
        console.log(eml);
        alert("Not an Admin. Please login properly.")
      }
  }
  return (
    <>
    <Navbar1 />
    <div className='bargav'>
      <div id="login-form-wrap">
        <h2 className='h2ead'>Login</h2>
          <form id="login-form" onSubmit={addaduser}>
            <p className='parad'>
            <input className='inptag' type="text" id="username" name="username" value={usnam} onChange={(e)=>{setusnam(e.target.value)}} placeholder="Username" required />
            {/* <i className="validation"><span></span><span></span></i> */}
            </p>
            <p className='parad'>
            <input className='inptag' type="email" id="email" name="email" value={eml} onChange={(e)=>{seteml(e.target.value)}} placeholder="Email Address" required />
            {/* <i className="validation"><span></span><span></span></i> */}
            </p>
            <p className='parad'>
            <input className='inptag' type="submit" id="login" value="Login" />
            </p>
          </form>
        <div id="create-account-wrap">
          <p className='parad'></p>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminLogin