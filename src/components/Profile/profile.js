import React, { useEffect, useRef, useState } from "react";
import style1 from "./profile.module.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const history = useHistory();
  const params = useParams();
  const auth = useSelector(state => state.validauth1);
  const [usr,setusr] = useState([])
  const id = params.uid;
  useEffect(() => {
    fuck()
  },[])
  async function fuck() {
    const r = await axios.get(`http://localhost:4000/users/${id}`)
    console.log(r.data.fullname)
    setusr(r.data)
  }

  const handlechange = (event) => {
    setusr({ ...usr, [event.target.name]: event.target.value });
  }

    async function subhandler(event) {
      event.preventDefault()
      const res = await axios.put(`http://localhost:4000/users/${id}/`, {
        fullname: usr.fullname,
        email: usr.email,
        password: usr.password
      }).then(resp => {
        history.push("/home/" + id);
        console.log("Ok")
      }).catch(err => {
        console.log("Error")
      })
    }
    return (
      auth === true ?
        <div className={style1.container}>
          <div className={style1.app_wrap}>
            {/* <div>
              <h2 className={style1.title}> Create Account</h2>
            </div>
     */}
            <form className={style1.form_wrapper} onSubmit={subhandler}>
              <div className={style1.name}>
                <label className={style1.label}>Edit Name</label>
                <input
                  className={style1.input}
                  type="text"
                  name="fullname"
                  value={usr.fullname}
                  onChange={handlechange}
                //   value={values.fullname}
                //   onChange={handlechange}
                ></input>
                {/* {errors.fullname && (
                  <p className={style1.error}>{errors.fullname}</p>
                )} */}
              </div>
    
              <div className={style1.email}>
                <label className={style1.label}>Change Email</label>
                <input
                  className={style1.input}
                  type="email"
                  name="email"
                  value={usr.email}
                  onChange={handlechange}
                //   value={values.email}
                //   onChange={handlechange}
                ></input>
                {/* {errors.email && <p className={style1.error}>{errors.email}</p>} */}
              </div>
    
              <div className={style1.password}>
                <label className={style1.label}>Change Password</label>
                {/* <span onClick={handleToggle1}>
                  <Icon icon={icon} size={20} />
                </span> */}
                <input
                  className={style1.input}
                  type="password"
                  value={usr.password}
                  onChange={handlechange}
                //   type={type}
                  name="password"
                //   value={values.password}
                //   onChange={handlechange}
                ></input>
    
                {/* {errors.password && (
                  <p className={style1.error}>{errors.password}</p>
                )} */}
              </div>
    
              {/* <div className={style1.password}>
                <label className={style1.label}> Confirm Password</label>
                <span onClick={handleToggle2}>
                  <Icon icon={icon2} size={20} />
                </span>
                <input
                  className={style1.input}
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handlechange}
                ></input>
                {errors.confirm_password && (
                  <p className={style1.error}>{errors.confirm_password}</p>
                )}
              </div> */}
    
              <div>
                <button className={style1.submit} >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div> : <h2>404 Error Not Found</h2>
    )
}

export default Profile;