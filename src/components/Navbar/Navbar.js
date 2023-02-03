import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import modeContext from "../modeContext";
import uniqid from "uniqid";
import { style } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logo2 from "./logo3.png";

function Navbar() {
  const color = useContext(modeContext);
  const auth = useSelector((state) => state.validauth1);
  const path = useLocation().pathname;
  const params = useParams();
  const uid = params.uid;
  const dispatch = useDispatch();
  // const uid = 1;
  const [userName, setUserName] = useState();

  useEffect(() => {
    console.log("bargav");
    const obj = localStorage.getItem("author");
    if (obj) {
      console.log("if");
      console.log(obj);
      if (obj === '"user"') {
        console.log("hello in if");
        dispatch({
          type: "setTrue1",
        });
      } else {
        dispatch({
          type: "setFalse1",
        });
      }
    }
    axios
      .get("http://localhost:4000/users/" + uid)
      .then((response) => {
        setUserName(response.data.fullname);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return auth === true ? (
    <div>
      {userName && (
        <div className={styles.navbar}>
          {/* <div className={styles.topnav} id="myTopnav">
            <Link
              to={`/home/${uid}`}
              className={path.includes("/home") ? styles.active : "inactive"}
            >
              Home
            </Link>
            <Link
              to={`/wishlist/${uid}`}
              className={
                path.includes("/wishlist") ? styles.active : "inactive"
              }
            >
              Wishlist
            </Link>
            <Link
              to={`/post/${uid}`}
              className={path.includes("/post") ? styles.active : "inactive"}
            >
              Post
            </Link>
            <Link
              to={`/profile/${uid}`}
              className={path.includes("/profile") ? styles.active : "inactive"}
            >
              Profile
            </Link> */}
          <div className={styles.header}>
            <img src={logo2} className={styles.logo} alt="logo" />{" "}
          </div>

          <div className={styles.topnav} id="myTopnav">
            {/* <i class="fab fa-cloudflare"></i> */}
            <Link
              to={`/home/${uid}`}
              className={path.includes("/home") ? styles.active : "inactive"}
            >
              Home
              {/* <i class="fa fa-home"></i> */}
              {/* <i class="fa fa-heart" aria-hidden="true"></i> */}
            </Link>
            <Link
              to={`/wishlist/${uid}`}
              className={
                path.includes("/wishlist") ? styles.active : "inactive"
              }
            >
              Wishlist
              {/* <i class="fa fa-shopping-cart"></i> */}
            </Link>
            <Link
              to={`/post/${uid}`}
              className={path.includes("/post") ? styles.active : "inactive"}
            >
              Post
              {/* <i class="fa fa-upload" aria-hidden="true"></i> */}
            </Link>
            <Link
              to={`/profile/${uid}`}
              className={path.includes("/profile") ? styles.active : "inactive"}
            >
              Profile
              {/* <i class="fa fa-user-circle-o" aria-hidden="true"></i> */}
            </Link>
            <Link
              to="/"
              onClick={() => {
                dispatch({
                  type: "setFalse1",
                });
                localStorage.removeItem("author");
              }}
            >
              LogOut
              {/* <i class="fa fa-sign-out" aria-hidden="true"></i> */}
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <h2></h2>
  );
}
export default Navbar;
