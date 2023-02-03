import styles from "./Description.module.css";
import img1 from "./t1.jpg";
import modeContext from "../modeContext";
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import PIm2 from "./assets/PIm2.png";
import PIm3 from "./assets/PIm3.png";
import PIm4 from "./assets/PIm4.png";
import PIm5 from "./assets/PIm5.png";
import sellerImg from "./assets/seller1.png";

function Description() {
  const color = useContext(modeContext);
  const params = useParams();
  const id = params.pid;
  const uid = params.uid;
  const history = useHistory();
  const [userData, setuserdata] = useState([]);
  const [serviceData, setServiceData] = useState();
  const auth = useSelector((state) => state.validauth1);
  useEffect(() => {
    axios
      .get("http://localhost:4000/services/" + id + "?_expand=user")
      .then((response) => {
        console.log(response.data);
        setServiceData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    func();
  }, []);

  async function func() {
    const res = await axios.get("http://localhost:4000/users/" + uid);
    console.log("lalith");
    console.log(res.data);
    setuserdata(res.data);
  }

  async function handleAddToWishlist(id) {
    await axios
      .post("http://localhost:4000/wishlist", { userId: uid, serviceId: id })
      .then((res) => {
        console.log(res.data);
      });
    history.push("/wishlist/" + uid);
  }

  useEffect(() => {}, []);

  //* image gallery
  // let mainImage = PIm3;
  const [mainImage, setMainImage] = useState(PIm3);
  function selectImage(image) {
    setMainImage(image);
  }
  return auth === true ? (
    serviceData && (
      <div className={styles.mainDiv}>
        <div className={styles.gallery}>
          <img
            className={`${styles.mainImg}`}
            src={mainImage}
            alt=""
            srcset=""
          />
          <div className={styles.subImgs}>
            <img
              className={styles.subImg}
              src={PIm3}
              alt=""
              srcset=""
              onClick={() => {
                selectImage(PIm3);
              }}
            />
            <img
              className={styles.subImg}
              src={PIm2}
              alt=""
              srcset=""
              onClick={() => {
                selectImage(PIm2);
              }}
            />
            <img
              className={styles.subImg}
              src={PIm4}
              alt=""
              srcset=""
              onClick={() => {
                selectImage(PIm4);
              }}
            />
          </div>
        </div>
        <div className={styles.desc}>
          <div className={styles.title}>I develop react websites</div>
          <div className={styles.seller}>
            <img src={sellerImg} alt="" className={styles.sellerImage} />
            <div className={styles.sellerName}>chandra Sekhar Sai</div>
          </div>
          <div className={styles.price}>
            {" "}
            <span style={{ color: "grey" }}>Starting from</span> 2399/-
          </div>
          <div className={styles.productDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui itaque
            consectetur debitis ea voluptas, iure odit laboriosam vero id optio
            libero, nam totam voluptatum. Harum! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Officiis mollitia ipsa nam eaque.
            Minus laborum molestiae officiis quam placeat voluptas error.
            Obcaecati amet provident dicta!
          </div>
          <div className={styles.addToWishlist}>Add to Wishlist</div>
          <div className={styles.contact}>Contact</div>
        </div>
      </div>
    )
  ) : (
    <h2>404 Error Not Found</h2>
  );
}

export default Description;
