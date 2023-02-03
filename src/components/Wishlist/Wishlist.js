import styles from "../Services/Services.module.css";
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
import modeContext from "../modeContext";
import { useSelector } from "react-redux";

function Wishlist() {
  const mod = 6;
  const arr = [pic0, pic1, pic2, pic3, pic4, pic5];
  let itr = -1;
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.validauth1);
  const history = useHistory();
  const [render, setRender] = useState(true);
  const color = useContext(modeContext);
  const params = useParams();
  const uid = params.uid;
  console.log("in ");
  function handleDeleteFromWishlist(id) {
    axios
      .delete("http://localhost:4000/wishlist/" + id)
      .then((res) => {
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const id = 1;
    axios
      .get("http://localhost:4000/wishlist?_expand=service&userId=" + uid)
      .then((result) => {
        console.log(result.data.length);
        setData(result.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [render]);

  return (
    // <div
    //   className={`${styles.serviceDiv} ${color ? styles.true : styles.false}`}
    // >
    //   {data &&
    //     data.map((data) => (
    //       <Link>
    //         <div className={styles.service}>
    //           <div className={styles.imageSection}>
    //             <img className={styles.image} src={pic1} />
    //           </div>
    //           <div className={styles.description}>
    //             <div className={styles.header}>
    //               <div className={styles.title}>{data.service.title}</div>
    //             </div>
    //             <div className={styles.separator}></div>

    //             <div className={styles.body}>
    //               <div className={styles.subbody}>
    //                 <img
    //                   src={pic1}
    //                   alt=""
    //                   srcset=""
    //                   className={styles.userImage}
    //                 />
    //                 <div className={styles.userName}>{data.user.userName}</div>
    //               </div>
    //             </div>
    //             <div className={styles.separator}></div>
    //             <div className={styles.price}>
    //               Starting from {data.service.price}\-
    //             </div>
    //             {/* <div className={styles.separator}></div> */}
    //             <div className={styles.footer}>
    //               <div>
    //                 <Link to={`/service/${data.service.id}`}> 🔎</Link>
    //               </div>
    //               <div>
    //                 <Link
    //                   onClick={() => {
    //                     handleDeleteFromWishlist(data.id);
    //                   }}
    //                 >
    //                   ❌
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    // </div>
    auth === true ? (
      <div className={styles.serviceDiv}>
        {data.map((data) => (
          // <div className={styles.card}>
          //   <img src={pic1} alt="John" className={styles.image} />
          //   <h3>{data.service.title}</h3>
          //   {/* <p className={styles.title}>CEO & Founder, Example</p> */}
          //   <p>{data.user.fullname}</p>
          //   <p>
          //     <button>
          //       <Link
          //         to={`/service/${uid}/${data.service.id}`}
          //         style={{
          //           textDecoration: "none",
          //           fontSize: "18px",
          //           color: "white",
          //         }}
          //       >
          //         {" "}
          //         <i class="fa fa-search" aria-hidden="true"></i>{" "}
          //       </Link>
          //     </button>
          //     <button
          //       onClick={() => {
          //         handleDeleteFromWishlist(data.id);
          //       }}
          //     >
          //       <i class="fa fa-trash" aria-hidden="true"></i>
          //     </button>
          //   </p>
          // </div>
          <div className={styles.card}>
            <img src={arr[++itr % mod]} alt="John" className={styles.image} />
            <h3 className={styles.title}>{data.service.title}</h3>
            {/* <p className={styles.title}>CEO & Founder, Example</p> */}
            <p className={styles.price}>₹{data.service.price}</p>
            <div className={styles.userData}>
              <Link to={`profile/${data.id}`}>
                <img className={styles.userImg} src={profpic1} alt="" />
              </Link>
              <p className={styles.userName}>{data.sellerData.fullname}</p>
            </div>
            <p>
              <button>
                <Link
                  to={`/service/${uid}/${data.service.id}`}
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
                onClick={() => {
                  handleDeleteFromWishlist(data.id);
                }}
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </p>
          </div>
        ))}
      </div>
    ) : (
      <h2>404 Error Not Found</h2>
    )
  );
}

export default Wishlist;
