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
import { log } from "util";
// * implement service fetching here and next service display component inside this so that
// * data can be easily filtered
function Search() {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => {
    // console.log(state);
    return state.validauth1;
  });

  // console.log("hello");
  // console.log(auth);
  const [filterData, setFilterData] = useState([]);
  // const [filterType, setFilterType] = useState("");
  // const [searchText, setSearchText] = useState("");

  // function filterhelper(ftype) {
  //   let temp = [];
  //   if (ftype == 1) {
  //     temp = [...data];
  //     temp.sort((d1, d2) => d1.price - d2.price);
  //   } else if (ftype == 2) {
  //     temp = [...data];
  //     temp.sort((d1, d2) => d2.price - d1.price);
  //   }
  //   return temp;
  // }

  const [filter, setFilter] = useState({
    search: 0,
    sort: 0,
    category: 0,
    price: 100000,
  });

  const color = useContext(modeContext);

  // function filterChangeHandle(searchT, filterType) {
  //   if (searchT == "clear") {
  //     setFilterData(data);
  //     return;
  //   }

  //   if (filterType && searchT == "") {
  //     let temp = filterhelper(filterType);
  //     setFilterData(temp);
  //     return;
  //   }

  //   if (filterType && searchT) {
  //     let temp = filterhelper(filterType);
  //     temp = temp.filter((d) => {
  //       return d.title.includes(searchT) == true;
  //     });
  //     setFilterData(temp);
  //     return;
  //   }

  //   if (searchT != "") {
  //     let temp = data.filter((d) => {
  //       return d.title.includes(searchT) == true;
  //     });
  //     setFilterData(temp);
  //   } else {
  //     setFilterData(data);
  //   }
  // }

  const [paginate, setPaginate] = useState({
    limit: 9,
    skip: 0,
    totalItems: 0,
    totalPages: 0,
    presentPage: 1,
  });

  useEffect(() => {
    axios
      .get(
        `https://fsd-backend.glitch.me/services/count/${filter.search}/${filter.sort}/${filter.category}/${filter.price}`
      )
      .then((result) => {
        console.log("here");
        console.log(result.data);
        setPaginate({
          ...paginate,
          totalItems: result.data.count,
          totalPages: Math.ceil(result.data.count / 9),
        });

        axios
          .get(
            `http://localhost:5000/services/${filter.search}/${filter.sort}/${filter.category}/${filter.price}/${paginate.limit}/${paginate.skip}`
          )
          .then((result) => {
            // setData(result.data);
            console.log(result.data);
            setFilterData(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updatedFilterSubmit() {
    //* on submit read all the filter options retrive the data and set the initial paginate values
    //* finding total services for the filter
    console.log("update filter");
    axios
      .get(
        `http://localhost:5000/services/${filter.search}/${filter.sort}/${filter.category}/${filter.price}/10000/0`
      )
      .then((result) => {
        // setData(result.data);
        setPaginate({
          ...paginate,
          presentPage: 1,
          skip: 0,
          limit: 9,
          totalItems: result.data.length,
          totalPages: Math.ceil(result.data.length / 9),
        });
        console.log(result.data);
        setFilterData(result.data.slice(0, 9));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearFilter() {
    //* on submit read all the filter options retrive the data and set the initial paginate values
    //* finding total services for the filter
    console.log("clear filter");
    // axios
    //   .get(`http://localhost:5000/services/0/0/0/100000/1000/0`)
    //   .then((result) => {
    //     // setData(result.data);
    //     console.log(result.data);
    //     setFilterData(result.data);
    //     // * must set paginate content too
    //     setPaginate({})
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(`http://localhost:5000/services/0/0/0/1000000/100000/0`)
      .then((result) => {
        // setData(result.data);
        setPaginate({
          ...paginate,
          presentPage: 1,
          skip: 0,
          limit: 9,
          totalItems: result.data.length,
          totalPages: Math.ceil(result.data.length / 9),
        });
        console.log(result.data);
        setFilter({
          ...filter,
          search: 0,
          sort: 0,
          category: 0,
          price: 100000,
        });
        setFilterData(result.data.slice(0, 9));
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`http://localhost:5000/services/count/0/0/0/1000000`)
    //   .then((result) => {
    //     console.log("here");
    //     console.log(result.data);
    //     setPaginate({
    //       ...paginate,
    //       presentPage: 1,
    //       skip: 0,
    //       limit: 10,
    //       totalItems: result.data.count,
    //       totalPages: Math.ceil(result.data.count / 10),
    //     });

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function updatedFilterNext() {
    console.log("update next");
    console.log(paginate);
    //* on submit read all the filter options retrive the data and set the initial paginate values
    axios
      .get(
        `http://localhost:5000/services/${filter.search}/${filter.sort}/${
          filter.category
        }/${filter.price}/${paginate.limit}/${paginate.skip + 9}`
      )
      .then((result) => {
        // setData(result.data);
        console.log(result.data);
        setFilterData(result.data);
        setPaginate({
          ...paginate,
          presentPage: paginate.presentPage + 1,
          skip: paginate.skip + 9,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updatedFilterPrev() {
    //* on submit read all the filter options retrive the data and set the initial paginate values
    console.log("update prev");
    // console.log(paginate);
    //* on submit read all the filter options retrive the data and set the initial paginate values
    axios
      .get(
        `http://localhost:5000/services/${filter.search}/${filter.sort}/${
          filter.category
        }/${filter.price}/${paginate.limit}/${paginate.skip - 9}`
      )
      .then((result) => {
        // setData(result.data);
        console.log(result.data);
        setFilterData(result.data);
        setPaginate({
          ...paginate,
          presentPage: paginate.presentPage - 1,
          skip: paginate.skip - 9,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return auth === true ? (
    <div className={styles.searchBox}>
      <div className={styles.searchComp}>
        <form
          className={styles.searchComp}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Search"
            onChange={(e) => {
              // setSearchText(e.target.value);
              // filterChangeHandle(e.target.value, filterType);
              let searchValue = e.target.value;
              if (searchValue == "") searchValue = 0;
              setFilter({ ...filter, search: searchValue });
            }}
          />
          <label htmlFor="">Sort </label>
          <select
            onChange={(e) => {
              // setFilterType(e.target.value);
              // filterChangeHandle(searchText, e.target.value);
              let sortValue = e.target.value;
              // if (searchValue == "") searchValue = false;
              setFilter({ ...filter, sort: sortValue });
            }}
          >
            <option value={0} selected hidden>
              Select
            </option>
            <option value="priceLTH">Low to High</option>
            <option value="priceHTL">High to Low</option>
            {/* <option value="3">Recently uploaded</option> */}
          </select>

          <label htmlFor="">Category</label>
          <select
            onChange={(e) => {
              // setFilterType(e.target.value);
              // filterChangeHandle(searchText, e.target.value);
              let catValue = e.target.value;
              // if (searchValue == "") searchValue = false;
              setFilter({ ...filter, category: catValue });
            }}
          >
            <option value={0} selected hidden>
              Select
            </option>
            <option value="web dev">Category-1</option>
            <option value="programming">Category-1</option>
            <option value="3">Category-1</option>
            <option value="4">Category-4</option>
          </select>
          <label htmlFor="">Price(0-{filter.price})</label>
          <input
            type="range"
            name=""
            id=""
            max="100000"
            min="0"
            value={filter.price}
            onChange={(e) => {
              let priceVal = e.target.value;
              // if(p)
              setFilter({ ...filter, price: priceVal });
            }}
          />
          <div>
            <input
              // type="reset"
              type="submit"
              value="Submit"
              // disabled
              onClick={() => updatedFilterSubmit()}
            />
            <input
              type="reset"
              value="Reset"
              // disabled
              onClick={() => {
                // setFilter({
                //   search: 0,
                //   sort: 0,
                //   category: 0,
                //   price: 100000,
                // });
                clearFilter();
              }}
            />
          </div>
        </form>
      </div>
      <div className={styles.paginationPlusService}>
        <div className={styles.paginationDiv}>
          <IconContext.Provider value={{ className: styles.paginationIcons }}>
            {paginate.presentPage != 1 && (
              <MdNavigateBefore
                className={styles.prev}
                onClick={() => {
                  // console.log("filter next");
                  updatedFilterPrev();
                }}
              />
            )}
            <div className={styles.pageNum}>{paginate.presentPage}</div>
            <CgFormatSlash />
            <div className={styles.totPageNum}>
              {paginate && paginate.totalPages}
            </div>
            {paginate.presentPage != paginate.totalPages && (
              <MdNavigateNext
                className={styles.next}
                onClick={() => {
                  // console.log("filter next");
                  updatedFilterNext();
                }}
              />
            )}
          </IconContext.Provider>
        </div>
        {<Services data={filterData} />}

        <div className={styles.paginationDiv} style={{ marginBottom: "10px" }}>
          <IconContext.Provider value={{ className: styles.paginationIcons }}>
            {paginate.presentPage != 1 && (
              <MdNavigateBefore
                className={styles.prev}
                onClick={() => {
                  // console.log("filter next");
                  updatedFilterPrev();
                }}
              />
            )}
            <div className={styles.pageNum}>{paginate.presentPage}</div>
            <CgFormatSlash />
            <div className={styles.totPageNum}>
              {paginate && paginate.totalPages}
            </div>
            {paginate.presentPage != paginate.totalPages && (
              <MdNavigateNext
                className={styles.next}
                onClick={() => {
                  // console.log("filter next");
                  updatedFilterNext();
                }}
              />
            )}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  ) : (
    <h2>404 Error Found</h2>
  );
}

export default Search;
