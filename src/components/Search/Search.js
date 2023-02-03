import styles from "./Search.module.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import modeContext from "../modeContext";
import Services from "../Services/Services";
import { useSelector } from "react-redux";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { CgFormatSlash } from "react-icons/cg";
import { IconContext } from "react-icons";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
// * implement service fetching here and next service display component inside this so that
// * data can be easily filtered
function Search() {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => {
    console.log(state);
    return state.validauth1;
  });
  console.log(auth);
  const [filterData, setFilterData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");

  function filterhelper(ftype) {
    let temp = [];
    if (ftype == 1) {
      temp = [...data];
      temp.sort((d1, d2) => d1.price - d2.price);
    } else if (ftype == 2) {
      temp = [...data];
      temp.sort((d1, d2) => d2.price - d1.price);
    }
    return temp;
  }

  const color = useContext(modeContext);
  useEffect(() => {
    axios
      .get("http://localhost:4000/services?_expand=user")
      .then((result) => {
        setData(result.data);
        setFilterData(result.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  function filterChangeHandle(searchT, filterType) {
    if (searchT == "clear") {
      setFilterData(data);
      return;
    }

    if (filterType && searchT == "") {
      let temp = filterhelper(filterType);
      setFilterData(temp);
      return;
    }

    if (filterType && searchT) {
      let temp = filterhelper(filterType);
      temp = temp.filter((d) => {
        return d.title.includes(searchT) == true;
      });
      setFilterData(temp);
      return;
    }

    if (searchT != "") {
      let temp = data.filter((d) => {
        return d.title.includes(searchT) == true;
      });
      setFilterData(temp);
    } else {
      setFilterData(data);
    }
  }

  return auth === true ? (
    <div className={styles.searchBox}>
      {/* <div
        className={`${styles.searchBarDiv} ${
          color ? styles.true : styles.false
        }`}
      >
        <form action="">
          <input
            id={styles.searchBar}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
              filterChangeHandle(e.target.value, filterType);
            }}
          />
          <select
            name=""
            className={styles.filter}
            onChange={(e) => {
              setFilterType(e.target.value);
              filterChangeHandle(searchText, e.target.value);
            }}
          >
            <option value="" selected hidden>
              Filter
            </option>
            <option value="1">Price:Low to High</option>
            <option value="2">Price:High to Low</option>
            <option value="3">Recently uploaded</option>
          </select>
          <input
            type="reset"
            value="Clear"
            className={styles.clear}
            onClick={() => filterChangeHandle("clear")}
          />
        </form>
      </div> */}

      <div className={styles.searchComp}>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Search"
          onChange={(e) => {
            setSearchText(e.target.value);
            filterChangeHandle(e.target.value, filterType);
          }}
        />
        <label htmlFor="">Sort </label>
        <select
          onChange={(e) => {
            setFilterType(e.target.value);
            filterChangeHandle(searchText, e.target.value);
          }}
        >
          <option value="australia" selected hidden>
            Select
          </option>
          <option value="1">Low to High</option>
          <option value="2">High to Low</option>
          <option value="3">Recently uploaded</option>
        </select>

        <label htmlFor="">Category</label>
        <select
          onChange={(e) => {
            // setFilterType(e.target.value);
            // filterChangeHandle(searchText, e.target.value);
          }}
        >
          <option value="australia" selected hidden>
            Select
          </option>
          <option value="1">Category-1</option>
          <option value="2">Category-1</option>
          <option value="3">Category-1</option>
          <option value="4">Category-4</option>
        </select>
        <label htmlFor="">Price(0-?)</label>
        <input type="range" name="" id="" max="100000" min="0" />
        <input
          type="reset"
          value="Reset"
          // disabled
          onClick={() => filterChangeHandle("clear")}
        />
      </div>
      <div className={styles.paginationPlusService}>
        <div className={styles.paginationDiv}>
          <IconContext.Provider value={{ className: styles.paginationIcons }}>
            <MdNavigateBefore className={styles.prev} />
            <div className={styles.pageNum}>1</div>
            <CgFormatSlash />
            <div className={styles.totPageNum}>4</div>
            <MdNavigateNext className={styles.next} />
          </IconContext.Provider>
        </div>
        {<Services data={filterData} />}
        {/* <div className={styles.paginationDiv}>
          <IconContext.Provider value={{ className: styles.paginationIcons }}>
            <MdNavigateBefore className={styles.prev} />
            <div className={styles.pageNum}>1</div>
            <CgFormatSlash />
            <div className={styles.totPageNum}>4</div>
            <MdNavigateNext className={styles.next} />
          </IconContext.Provider>
        </div> */}
      </div>
    </div>
  ) : (
    <h2>404 Error Found</h2>
  );
}

export default Search;
