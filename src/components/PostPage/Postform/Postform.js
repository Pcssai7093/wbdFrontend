import React, { useEffect, useRef, useState } from "react";
import styles from "./Postform.module.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Postform = () => {
  const history = useHistory();
  const params = useParams();
  const uid = params.uid;
  const pnam = useRef();
  const pdes = useRef();
  const pc = useRef();
  const bp = useRef();
  const images = useRef();
  // const [errs,seterrs] = useState(0)
  const [err, seterr] = useState({
    name: 0,
    desc: 0,
    bprice: 0,
  });

  const addposthandler = (e) => {
    e.preventDefault();
    let namp = pnam.current.value;
    const desp = pdes.current.value;
    const cp = pc.current.value;
    const pb = bp.current.value;
    namp = namp.toLowerCase();
    let temp_err_obj = { ...err };
    let flag = 0;
    let pbp = 0;

    let lol = pb.length;
    for (let i = 0; i < lol; i++) {
      if (pb[i].charCodeAt(0) < 48 || pb[i].charCodeAt(0) > 57) {
        pbp = 1;
        // console.log(pb[i])
      }
    }
    if (
      namp.charCodeAt(0) < 97 ||
      namp.charCodeAt(0) > 122 ||
      namp.length < 8
    ) {
      // seterr({
      //   ...err,
      //   name: 5,
      // });
      temp_err_obj.name = 5;
      flag = 1;
      // console.log(namp.charCodeAt(0))
      console.log(namp.length);
      console.log("heroooooo");
    } else {
      temp_err_obj.name = 0;
    }

    if (desp.length === 0 || desp.length < 20) {
      // seterr({
      //   ...err,
      //   desc: 5,
      // });
      temp_err_obj.desc = 5;
      flag = 1;
    } else {
      temp_err_obj.desc = 0;
    }

    if (pb.length === 0 || pbp === 1) {
      // seterr({
      //   ...err,
      //   bprice: 5,
      // });
      temp_err_obj.bprice = 5;
      flag = 1;
      console.log(typeof pb);
    } else {
      temp_err_obj.bprice = 0;
    }

    if (images.current.length != 2) {
      alert("2 images input should be given");
    } else {
      if (flag === 0 && parseInt(pb) >= 0) {
        let formData = new FormData();
        formData.append("images", images.current.files[0]);
        formData.append("images", images.current.files[1]);
        formData.append("title", namp);
        formData.append("description", desp);
        formData.append("price", pb);
        formData.append("category", cp);
        formData.append("seller", uid);

        axios
          .post("https://fsd-backend.glitch.me/service/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data == true) {
              alert("post added successfully");
            } else {
              alert("post added failed retry");
            }
          });
      } else {
        console.log("Err");
        seterr(temp_err_obj);
      }
    }
  };

  console.log("hello");
  return true ? (
    <>
      <div className={"container " + styles.container}>
        <form onSubmit={addposthandler} enctype="multipart/form-data">
          <div className={styles.row}>
            <div className={styles["col-25"]}>
              <label className={styles.lb} htmlFor="pname">
                Product Name
              </label>
            </div>
            <div className={styles["col-45"]}>
              {err.name === 0 && (
                <input
                  className={styles.ipt}
                  type="text"
                  ref={pnam}
                  id="pname"
                  name="pname"
                />
              )}
              {err.name === 5 && (
                <input
                  className={styles.e}
                  type="text"
                  ref={pnam}
                  id="pname"
                  name="pname"
                />
              )}
            </div>
            <div className={styles["col-30"]}></div>
          </div>
          {/* {err.name && (
            <p className={styles.err1}>
              Please Enter some product name
            </p>
          )} */}
          <div className={styles.row}>
            <div className={styles["col-25"]}>
              <label className={styles.lb} htmlFor="pdesc">
                Product Description
              </label>
            </div>
            <div className={styles["col-45"]}>
              {err.desc === 0 && (
                <textarea
                  className={styles.ipt}
                  id="pdesc"
                  ref={pdes}
                  name="pdesc"
                  placeholder="Describe your product..."
                  style={{ height: 200 }}
                ></textarea>
              )}
              {err.desc === 5 && (
                <textarea
                  className={styles.e}
                  id="pdesc"
                  ref={pdes}
                  name="pdesc"
                  placeholder="Describe your product..."
                  style={{ height: 200 }}
                ></textarea>
              )}
            </div>
            <div className={styles["col-30"]}></div>
          </div>
          {/* {err.desc && (
            <p className={styles.err2}>
              Please Enter something describing your product
            </p>
          )} */}
          <div className={styles.row}>
            <div className={styles["col-25"]}>
              <label className={styles.lb} htmlFor="pcat">
                Product Category
              </label>
            </div>
            <div className={styles["col-45"]}>
              <select
                className={styles.ipt + " " + styles.ti}
                ref={pc}
                id="pcat"
                name="pcat"
              >
                <option value="programming">Programming</option>
                <option value="web development">Web Development</option>
                <option value="cloud computing">Cloud Computing</option>
                <option value="communication networks">
                  Communication Networks
                </option>
                <option value="machine learning">Machine Learning</option>
                <option value="game development">Game Development</option>
              </select>
            </div>
            <div className={styles["col-30"]}></div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-25"]}>
              <label className={styles.lb} htmlFor="bprice">
                Product Price
              </label>
            </div>
            <div className={styles["col-45"]}>
              {err.bprice === 0 && (
                <input
                  className={styles.ipt + " " + styles.ti2}
                  type="text"
                  ref={bp}
                  id="bprice"
                  name="bprice"
                />
              )}
              {err.bprice === 5 && (
                <input
                  className={styles.e + " " + styles.ti2}
                  type="text"
                  ref={bp}
                  id="bprice"
                  name="bprice"
                />
              )}
            </div>
          </div>
          {/* {err.bprice && (
            <p className={styles.err3}>Please Enter a valid price</p>
          )} */}
          <div className={styles.row}>
            <label htmlFor="">Select Images</label>
            <input
              type="file"
              src=""
              alt=""
              name="images"
              accept="image/*"
              multiple
              ref={images}
              // onChange={(e) => {
              //   console.log(e);
              // }}
            />
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className={"col-3 " + styles.sub}>
              <input type="submit" value="Submit" className={styles.inp} />
            </div>
            <div className="col-3"></div>
            <div className="col-3"></div>
          </div>
          <pre></pre>
        </form>
      </div>
    </>
  ) : (
    <h2>404 Error Not Found</h2>
  );
};

export default Postform;
