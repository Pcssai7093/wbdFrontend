import React, { useEffect, useRef, useState } from "react";
import styles from "./Postform.module.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Postform = () => {
  const history = useHistory();
  const params = useParams();
  const auth = useSelector(state => state.validauth1);
  const uid = params.uid;
  const pnam = useRef();
  const pdes = useRef();
  const pc = useRef();
  const bp = useRef();
  // const [errs,seterrs] = useState(0)
  const [err, seterr] = useState({
    name: 0,
    desc: 0,
    bprice: 0,
  });

  // const allerrs = () => {
  //   if(err.name=== 5 || err.desc=== 5 || err.bprice===5)
  //   {
  //     seterrs(1);
  //   }
  //   else
  //   {
  //     seterrs(0);
  //   }
  //   console.log(err)
  // }

  // useEffect(() => {
  //   allerrs()
  // },[err]) 
  

  // const allerrs = () => {
  //   if(err.name=== 5 || err.desc=== 5 || err.bprice===5)
  //   {
  //     seterrs(1);
  //   }
  //   else
  //   {
  //     seterrs(0);
  //   }
  //   console.log(err)
  // }

  // const someerrs = () => {
  //   if(err.name=== 0 && err.desc!== 0 && err.bprice!==0)
  // }

  // const addposthandler = (event) => {
  //   event.preventDefault();
  //   const namp = pnam.current.value;
  //   const desp = pdes.current.value;
  //   const cp = pc.current.value;
  //   const pb = bp.current.value;
  //   let temp_err_obj = {...err}
  //   let flag = 0;
  //   if ((namp.charCodeAt(0) < 97 || namp.charCodeAt(0) > 122) || (namp.charCodeAt(0) < 65 || namp.charCodeAt(0) > 90)) {
  //     // seterr({
  //     //   ...err,
  //     //   name: 5,
  //     // });
  //     temp_err_obj.name = 5;
  //     flag = 1;
  //     console.log(namp.charCodeAt(0))
  //     console.log(err.name)
  //     console.log("heroooooo")
  //   }
  //   else{
  //     temp_err_obj.name = 0;
  //   }

    

  //   // else {
  //   //   seterr({
  //   //     ...err,
  //   //     name: 0,
  //   //   });
  //   // }

  //   if (desp.length === 0) {
  //     // seterr({
  //     //   ...err,
  //     //   desc: 5,
  //     // });
  //     temp_err_obj.desc = 5;
  //     flag = 1;
  //   }
  //   else{
  //     temp_err_obj.desc = 0;
  //   }

  //   // else {
  //   //   seterr({
  //   //     ...err,
  //   //     desc: 0,
  //   //   });
  //   // }

  //   if (pb.length === 0 || (typeof pb == "string")) {
  //     // seterr({
  //     //   ...err,
  //     //   bprice: 5,
  //     // });
  //     temp_err_obj.bprice = 5;
  //     flag = 1;
  //     console.log(typeof pb)
  //   }
  //   else{
  //     temp_err_obj.bprice = 0;
  //   }

  //   // else {
  //   //   seterr({
  //   //     ...err,
  //   //     bprice: 0,
  //   //   });
  //   // }

  //   // if(ps.length ===0 || ps <0)
  //   // {
  //   //     seterr({
  //   //         ...err,
  //   //         sprice : 'Enter a valid standard price'
  //   // })
  //   // }

  //   // if(prp.length ===0 || prp <0)
  //   // {
  //   //     seterr({
  //   //         ...err,
  //   //         pprice : 'Enter a valid premium price'
  //   // })
  //   // }

  //   // if(db.length ===0)
  //   // {
  //   //     seterr({
  //   //         ...err,
  //   //         bdesc : 'Enter a valid basic description'
  //   // })
  //   // }

  //   // if(ds.length ===0)
  //   // {
  //   //     seterr({
  //   //         ...err,
  //   //         sdesc : 'Enter a valid standard description'
  //   // })
  //   // }

  //   // if(dp.length ===0)
  //   // {
  //   //     seterr({
  //   //         ...err,
  //   //         prdesc : 'Enter a valid premium description'
  //   // })
  //   // }
  //   // props.Addpost(namp,desp,cp,pb,db,ps,ds,prp,dp)
  //   // if(namp!=null && desp!=null && cp!=null &&)
  //   seterr(temp_err_obj)
  //   if (flag===0 && parseInt(pb) >= 0) {
  //     axios
  //       .post("http://localhost:4000/services", {
  //         title: namp,
  //         description: desp,
  //         price: pb,
  //         category: cp,
  //         userId: uid,
  //       })
  //       .then(() => {
  //         history.push("/home/" + uid);
  //         console.log("Post added successfully");
  //       });
  //   } else {
  //     console.log("Erripooka");
  //   }
  // };

  const addposthandler = (e) => {
    e.preventDefault()
    let namp = pnam.current.value;
    const desp = pdes.current.value;
    const cp = pc.current.value;
    const pb = bp.current.value;
    namp = namp.toLowerCase()
    let temp_err_obj = {...err}
    let flag = 0;
    let pbp = 0;

    let lol = pb.length
    for(let i = 0; i < lol ; i++)
    {
      if ((pb[i].charCodeAt(0) < 48 || pb[i].charCodeAt(0) > 57))
      {
        pbp = 1;
        // console.log(pb[i])
      }
    }
    if ((namp.charCodeAt(0) < 97 || namp.charCodeAt(0) > 122) || namp.length < 8) {
          // seterr({
          //   ...err,
          //   name: 5,
          // });
          temp_err_obj.name = 5;
          flag = 1;
          // console.log(namp.charCodeAt(0))
          console.log(namp.length)
          console.log("heroooooo")
        }
        else{
          temp_err_obj.name = 0;
        }

        if (desp.length === 0 || desp.length < 20) {
              // seterr({
              //   ...err,
              //   desc: 5,
              // });
              temp_err_obj.desc = 5;
              flag = 1;
            }
            else{
              temp_err_obj.desc = 0;
            }
        
            if (pb.length === 0 || pbp === 1) {
                  // seterr({
                  //   ...err,
                  //   bprice: 5,
                  // });
                  temp_err_obj.bprice = 5;
                  flag = 1;
                  console.log(typeof pb)
                }
                else{
                  temp_err_obj.bprice = 0;
                }
          
    if (flag===0 && parseInt(pb) >= 0) {
      axios
        .post("http://localhost:4000/services", {
          title: namp,
          description: desp,
          price: pb,
          category: cp,
          userId: uid,
        })
        .then(() => {
          history.push("/home/" + uid);
          console.log("Post added successfully");
        });
    } else {
      console.log("Err");
      seterr(temp_err_obj)
    }
  }


  console.log("hello");
  return (
    auth === true ? <>
      <div className={"container " + styles.container}>
        <form onSubmit={addposthandler}>
          <div className={styles.row}>
            <div className={styles["col-25"]}>
              <label className={styles.lb} htmlFor="pname">
                Product Name
              </label>
            </div>
            <div className={styles["col-45"]}>
            {err.name===0 && (<input
                className={styles.ipt}
                type="text"
                ref={pnam}
                id="pname"
                name="pname"
              />) 
            }
            {err.name===5 && (<input
                className={styles.e} 
                type="text"
                ref={pnam}
                id="pname"
                name="pname"
              />) 
            }
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
              {err.desc===0 && (<textarea
                className={styles.ipt}
                id="pdesc"
                ref={pdes}
                name="pdesc"
                placeholder="Describe your product..."
                style={{ height: 200 }}
              ></textarea>)}
              {err.desc===5 && (<textarea
                className={styles.e}
                id="pdesc"
                ref={pdes}
                name="pdesc"
                placeholder="Describe your product..."
                style={{ height: 200 }}
              ></textarea>)}
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
              <select className={styles.ipt + " " + styles.ti} ref={pc} id="pcat" name="pcat">
                <option value="programming">Programming</option>
                <option value="web development">Web Development</option>
                <option value="cloud computing">Cloud Computing</option>
                <option value="communication networks">Communication Networks</option>
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
              {err.bprice===0 && (<input
                className={styles.ipt + " " + styles.ti2}
                type="text"
                ref={bp}
                id="bprice"
                name="bprice"
              />)}
              {err.bprice===5 && (<input
                className={styles.e + " " + styles.ti2}
                type="text"
                ref={bp}
                id="bprice"
                name="bprice"
              />)}
            </div>
            <div className={styles["col-30"]}></div>
          </div>
          {/* {err.bprice && (
            <p className={styles.err3}>Please Enter a valid price</p>
          )} */}
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
    </> : <h2>404 Error Not Found</h2>
  );
};

export default Postform;
