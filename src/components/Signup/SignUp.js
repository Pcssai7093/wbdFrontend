import React, { useState } from "react";
import style1 from "./signupform.module.css";
import Validation from "./Validation";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import { useHistory } from "react-router-dom";

function SignUp() {
  const [icon, setIcon] = useState(eyeOff);
  const [icon2, setIcon2] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const history = useHistory();

  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let temp = Validation(values);
    console.log(temp);
    setErrors(Validation(values));

    // console.log(errors);
    // console.log(Object.values(errors).length);
    // let no_errors=Object.keys(errors).length
    let no_errors = Object.values(errors).length;

    console.log(no_errors);
    if (no_errors === 0) {
      // console.log(Object.keys(errors).length);
      console.log("no errors");
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(() => {
        console.log("new blog added");
      });
      history.push("/signin");
    }
    // event.submit();
  };

  const handleToggle1 = () => {
    if (type == "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleToggle2 = () => {
    if (type2 == "password") {
      setIcon2(eye);
      setType2("text");
    } else {
      setIcon2(eyeOff);
      setType2("password");
    }
  };

  return (
    <div className={style1.container}>
      <div className={style1.app_wrap}>
        <div>
          <h2 className={style1.title}> Create Account</h2>
        </div>

        <form className={style1.form_wrapper}>
          <div className={style1.name}>
            <label className={style1.label}> FullName</label>
            <input
              className={style1.input}
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handlechange}
            ></input>
            {errors.fullname && (
              <p className={style1.error}>{errors.fullname}</p>
            )}
          </div>

          <div className={style1.email}>
            <label className={style1.label}> Email</label>
            <input
              className={style1.input}
              type="email"
              name="email"
              value={values.email}
              onChange={handlechange}
            ></input>
            {errors.email && <p className={style1.error}>{errors.email}</p>}
          </div>

          <div className={style1.password}>
            <label className={style1.label}> Password</label>
            <span onClick={handleToggle1}>
              <Icon icon={icon} size={20} />
            </span>
            <input
              className={style1.input}
              type={type}
              name="password"
              value={values.password}
              onChange={handlechange}
            ></input>

            {errors.password && (
              <p className={style1.error}>{errors.password}</p>
            )}
          </div>

          <div className={style1.password}>
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
          </div>

          <div>
            <button className={style1.submit} onClick={handleFormSubmit}>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
