import styles from "./Services.module.css";
import pic0 from "./s0.png";
import pic1 from "./s1.png";
import pic2 from "./s2.png";
import pic3 from "./s3.png";
import pic4 from "./s4.png";
import pic5 from "./s5.png";
import profpic1 from "./p1.png";

import { Link, useHistory, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import modeContext from "../modeContext";
import axios from "axios";
import { setRef } from "@mui/material";

function Services({ data }) {
  const mod = 6;
  const arr = [pic0, pic1, pic2, pic3, pic4, pic5];
  let itr = -1;
  const color = useContext(modeContext);
  const history = useHistory();
  const userId = useParams().uid;
  async function handleAddToWishlist(id) {
    let sellerDetails = await axios.get(
      "http://localhost:4000/services/" + id + "?_expand=user"
    );
    // console.log(sellerDetails.data);
    let sellerData = sellerDetails.data.user;

    await axios
      .post("http://localhost:4000/wishlist", {
        userId: userId,
        serviceId: id,
        sellerData: sellerData,
      })
      .then((res) => {
        console.log(res.data);
      });
    history.push("/wishlist/" + userId);
  }

  return (
    // <div
    //   className={`${styles.serviceDiv} ${color ? styles.true : styles.false} `}
    // >
    //   {data.map((data) => (
    //     <div className={styles.service}>
    //       <div className={styles.imageSection}>
    //         <img className={styles.image} src={pic1} />
    //       </div>
    //       <div className={styles.description}>
    //         <div className={styles.header}>
    //           <div className={styles.title}>{data.title}</div>
    //         </div>
    //         <div className={styles.separator}></div>

    //         <div className={styles.body}>
    //           <div className={styles.subbody}>
    //             <img src={pic1} alt="" srcset="" className={styles.userImage} />
    //             <div className={styles.userName}>{data.user.userName}</div>
    //           </div>
    //         </div>

    //         <div className={styles.separator}></div>
    //         <div className={styles.price}>Starting from {data.price}\-</div>
    //         {/* <div className={styles.separator}></div> */}
    //         <div className={styles.footer}>
    //           <div>
    //             <Link to={`/service/${userId}/${data.id}`}> 🔎</Link>
    //           </div>
    //           <div>
    //             <Link
    //               onClick={() => {
    //                 handleAddToWishlist(data.id);
    //               }}
    //             >
    //               💜
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    // <div className={styles.serviceDiv}>
    //   {data.map((data) => (
    //     <div className={styles.card}>
    //       <img src={pic1} alt="John" className={styles.image} />
    //       <h3>{data.title}</h3>
    //       {/* <p className={styles.title}>CEO & Founder, Example</p> */}
    //       <p>₹{data.price}</p>
    //       <p>{data.user.fullname}</p>
    //       <p>
    //         <button
    //           onClick={() => {
    //             history.push(`/service/${userId}/${data.id}`);
    //           }}
    //         >
    //           <Link
    //             to={`/service/${userId}/${data.id}`}
    //             style={{
    //               textDecoration: "none",
    //               fontSize: "18px",
    //               color: "white",
    //             }}
    //           >
    //             {" "}
    //             <i class="fa fa-search" aria-hidden="true"></i>{" "}
    //           </Link>
    //         </button>
    //         <button
    //           onClick={() => {
    //             handleAddToWishlist(data.id);
    //           }}
    //         >
    //           <i class="fa fa-heart" aria-hidden="true"></i>
    //         </button>
    //       </p>
    //     </div>
    //   ))}
    // </div>
    <div className={styles.serviceBox}>
      <div className={styles.serviceDiv}>
        {data.map((data) => (
          <div className={styles.card}>
            <img src={arr[++itr % mod]} alt="John" className={styles.image} />

            <h3 className={styles.title}>{data.title}</h3>
            {/* <p className={styles.title}>CEO & Founder, Example</p> */}
            <p className={styles.price}>₹{data.price}</p>
            <div className={styles.userData}>
              <Link to={`profile/${data.id}`}>
                <img className={styles.userImg} src={profpic1} alt="" />
              </Link>
              <p className={styles.userName}>{data.seller.fullname}</p>
            </div>

            <p>
              <button
                onClick={() => {
                  history.push(`/service/${userId}/${data._id}`);
                }}
              >
                <Link
                  to={`/service/${userId}/${data._id}`}
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
                  handleAddToWishlist(data.id);
                }}
              >
                <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
