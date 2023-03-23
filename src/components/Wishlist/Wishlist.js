// import styles from "../Services/Services.module.css";
import styles from "./Wishlist.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import profpic1 from "./p1.png";
import pic0 from "./s0.png";
import pic1 from "./s1.png";
import pic2 from "./s2.png";
import pic3 from "./s3.png";
import pic4 from "./s4.png";
import pic5 from "./s5.png";
import loginContext from "../../index";
import Cookies from "universal-cookie";

function Wishlist() {
  const loginStatusObj = useContext(loginContext);
  const cookies = new Cookies();

  const mod = 6;
  const arr = [pic0, pic1, pic2, pic3, pic4, pic5];
  let itr = -1;
  const [data, setData] = useState([]);
  const history = useHistory();
  const [render, setRender] = useState(true);
  const params = useParams();
  const uid = params.uid;
  // console.log("in ");
  function handleDeleteFromWishlist(sid) {
    let data = { sid, uid };
    axios
      .post("https://fsd-backend.glitch.me/wishlist/delete", data)
      .then((result) => {
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .delete("http://localhost:4000/wishlist/" + id)
    //   .then((res) => {
    //     setRender(!render);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  useEffect(() => {
    const id = 1;
    axios
      .get("https://fsd-backend.glitch.me/wishlist/" + uid)
      .then((result) => {
        // console.log(result.data.wishlist);
        setData((prev) => result.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  return loginStatusObj.isLogin ? (
    <div className={styles.wishlistWrapper}>
      {/* <h2>WishList</h2> */}
      <div className={styles.serviceDiv}>
        {data &&
          data.map((data) => (
            <div className={styles.card}>
              <img src={arr[++itr % mod]} alt="John" className={styles.image} />
              <h3 className={styles.title}>{data.title}</h3>
              {/* <p className={styles.title}>CEO & Founder, Example</p> */}
              <p className={styles.price}>₹{data.price}</p>
              <div className={styles.userData}>
                <Link to={`profile/${data.seller._id}`}>
                  <img className={styles.userImg} src={profpic1} alt="" />
                </Link>
                <p className={styles.userName}>{data.seller.fullname}</p>
              </div>
              <p>
                <button className={styles.goToServiceButton}>
                  <Link
                    to={`/service/${uid}/${data._id}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    {" "}
                    <i class="fa fa-search" aria-hidden="true"></i>{" "}
                  </Link>
                </button>
                <button
                  className={styles.wishlistButton}
                  onClick={() => {
                    handleDeleteFromWishlist(data._id);
                  }}
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </p>
            </div>
          ))}
      </div>
    </div>
  ) : (
    "please Login"
  );
}

export default Wishlist;
