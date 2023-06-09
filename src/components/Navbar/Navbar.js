import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import uniqid from "uniqid";
import { style } from "@mui/system";
import axios from "axios";
import logo2 from "./logo3.png";
import loginContext from "../../index";
import Cookies from "universal-cookie";

function Navbar() {
  // axios.defaults.withCredentials = true;
  const loginStatusObj = useContext(loginContext);
  const path = useLocation().pathname;
  const params = useParams();
  const uid = params.uid;
  const cookies = new Cookies();
  const history = useHistory();

  // const uid = 1;
  const [userName, setUserName] = useState();
  const [unseen, setUnseen] = useState(0);
  useEffect(() => {
    axios
      .get("https://fsd-backend.glitch.me/user/" + uid, {
        headers: { authorization: cookies.get("jwtToken") },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data == "auth failed") {
          loginStatusObj.isLogin = false;
        } else setUserName(response.data.fullname);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://fsd-backend.glitch.me/chat/countUnseen/" + uid)
      .then((response) => {
        setUnseen((prev) => {
          return response.data.count;
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // * removing auth temporarily
  return (
    <div>
      {userName && (
        <div className={styles.navbar}>
          <div className={styles.header}>
            <div className={styles.greeting}>Hey!!</div> {userName}
          </div>

          <div className={styles.topnav} id="myTopnav">
            {/* <i class="fab fa-cloudflare"></i> */}
            <Link
              to={`/home/${uid}`}
              className={
                path.includes("/home") || path.includes("/service")
                  ? styles.active
                  : "inactive"
              }
            >
              Home
              {/* <i class="fa fa-home"></i> */}
              {/* <i class="fa fa-heart" aria-hidden="true"></i> */}
            </Link>
            <Link
              to={`/chat/${uid}`}
              className={
                path.includes("/chat") || path.includes("/service")
                  ? styles.active
                  : "inactive"
              }
            >
              Chat
              {!path.includes("/chat") && (
                <sup
                  style={{
                    backgroundColor: unseen !== 0 ? "white" : "",
                    color: "black",
                    width: unseen !== 0 ? "40px" : "",
                    borderRadius: "20px",
                    fontSize: "15px",
                    padding: unseen !== 0 ? "5px 10px" : "",
                  }}
                >
                  {unseen !== 0 ? unseen : ""}
                </sup>
              )}
              {/* <i class="fa fa-home"></i> */}
              {/* <i class="fa fa-heart" aria-hidden="true"></i> */}
            </Link>
            <Link
              to={`/wishlist/${uid}`}
              className={
                path.includes("/wishlist") || path.includes("/service")
                  ? styles.active
                  : "inactive"
              }
            >
              Wishlist
              {/* <i class="fa fa-shopping-cart"></i> */}
            </Link>
            <Link
              to={`/post/${uid}`}
              className={
                path.includes("/post") || path.includes("/service")
                  ? styles.active
                  : "inactive"
              }
            >
              Post
              {/* <i class="fa fa-upload" aria-hidden="true"></i> */}
            </Link>
            <Link
              to={`/profile/${uid}/${uid}`}
              className={
                path.includes("/profile") || path.includes("/service")
                  ? styles.active
                  : "inactive"
              }
            >
              Profile
              {/* <i class="fa fa-user-circle-o" aria-hidden="true"></i> */}
            </Link>
            <Link
              className={styles.logOutLink}
              onClick={() => {
                cookies.remove("jwtToken");
                history.push("/signin");
              }}
            >
              LogOut
              {/* <i class="fa fa-sign-out" aria-hidden="true"></i> */}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
