import React, { useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import pic0 from "./s0.png";

function Profile() {
  const history = useHistory();
  const params = useParams();
  const [usr, setusr] = useState([]);
  const [editable, setEditable] = useState(false);
  const uid = params.uid;
  const profilerId = params.profilerId;
  const [userData, setUserData] = useState();
  const [updateData, setUpdateData] = useState({});
  const [userSkills, setUserSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  function handleEdit() {
    console.log("handle edit");
    setEditable((prev) => true);
  }

  async function handleUpdate() {
    console.log("handle update");
    updateData.skills = [...userSkills];
    console.log(updateData);
    await axios
      .post(
        "https://fsd-backend.glitch.me/user/profile/update/" + uid,
        updateData
      )
      .then((response) => {
        if (response.data == true) {
          alert("user data updated");
        } else {
          alert("Retry");
        }
      });
    // console.log(updateData);
    setEditable((prev) => false);
  }

  function handleSkillAdd(val) {
    setUserSkills((prev) => {
      if (!prev.includes(val)) {
        return [...prev, val];
      } else return prev;
    });
    console.log("handle skill add");
  }

  function handleSkillDelete(val) {
    console.log("handle delete");
    let skillsObj = userSkills;
    let elemIndex = skillsObj.indexOf(val);
    // console.log(val, elemIndex);
    if (elemIndex > -1) {
      // console.log("deleted");
      skillsObj.splice(elemIndex, 1);
      setUserSkills((prev) => [...skillsObj]);
      // console.log(skillsObj);
    }
  }

  useEffect(() => {
    axios
      .get("https://fsd-backend.glitch.me/user/profile/" + profilerId)
      .then((result) => {
        console.log("user data fetched");
        let data = result.data;
        updateData.fullname = data.fullname;
        updateData.skills = data.skills;
        updateData.about = data.about;
        setUserData(data);
        setUserSkills(data.skills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    userData && (
      <div className={styles.profilePageDiv}>
        <form
          className={`${styles.searchComp} ${
            editable === false ? styles.disabled : ""
          }`}
        >
          <div className={styles.row}>
            <label className={styles.label1}>Full Name:</label>
            <input
              className={styles.input1}
              type="text"
              name="fullname"
              // value={userData?.fullname}
              defaultValue={userData.fullname}
              onChange={(e) => {
                setUpdateData((prev) => {
                  prev.fullname = e.target.value;
                  // console.log(prev);
                  return { ...prev };
                });
              }}
            ></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label1}>UserName:</label>
            <input
              className={styles.input1}
              type="text"
              name="email"
              defaultValue={userData.username}
              disabled
            ></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label1}>Email:</label>

            <input
              className={styles.input1}
              name="password"
              defaultValue={userData.email}
              disabled
            ></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label1}>Skills:</label>
            <div className={styles.skillsSection}>
              <div className={`${styles.skillsDiv}`}>
                {uid === profilerId && (
                  <>
                    <input
                      type="text"
                      onChange={(e) => {
                        setInputSkill(e.target.value);
                      }}
                    />
                    <button
                      className={styles.skillItemValueAddBtn}
                      type="button"
                      onClick={() => {
                        if (inputSkill !== "") handleSkillAdd(inputSkill);
                      }}
                    >
                      Add
                    </button>
                  </>
                )}

                <div className={styles.skillsList}>
                  {userSkills &&
                    userSkills.map((v) => (
                      <div className={styles.skillItem}>
                        <div className={styles.skillItemValue}>{v}</div>
                        {uid === profilerId && (
                          <button
                            type="button"
                            className={styles.skillItemValueDelBtn}
                            onClick={() => {
                              handleSkillDelete(v);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <label className={styles.label1}>About:</label>
            <textarea
              rows="6"
              cols="46"
              className={styles.about}
              defaultValue={userData.about}
              onChange={(e) => {
                setUpdateData((prev) => {
                  prev.about = e.target.value;
                  // console.log(prev);
                  return { ...prev };
                });
              }}
            ></textarea>
          </div>
        </form>
        {/* <div className={styles.row}>
          <p className={styles.heading}>Services Posted:</p>
          <div className={styles.servicesItemDiv}>
            {userData.services.map((item) => (
              <div className={styles.servicesItem}>
                <Link to={`/service/${uid}/${item._id}`}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div> */}
        {uid === profilerId && (
          <div className={styles.buttonDiv}>
            {!editable && (
              <button
                type="button"
                className={styles.edit}
                onClick={() => {
                  handleEdit();
                }}
              >
                Edit
              </button>
            )}
            {editable && (
              <button
                type="button"
                className={styles.update}
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </button>
            )}
          </div>
        )}

        <div className={styles.wishlistWrapper}>
          {/* <h2>Services Posted</h2> */}
          <div className={styles.serviceDiv}>
            {userData.services &&
              userData.services.map((data) => (
                <div className={styles.card}>
                  <img src={pic0} alt="John" className={styles.image} />
                  <h3 className={styles.title}>{data.title}</h3>
                  {/* <p className={styles.title}>CEO & Founder, Example</p> */}
                  <p className={styles.price}>₹{data.price}</p>
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
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
