import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./components/Search/Search";
import Description from "./components/Description/Description";
import Space from "./components/Space/Space";
import { useState, useContext } from "react";
import { fontSize } from "@mui/system";
import { AdminHome } from "./components/Admin/admin";
import Postform from "./components/PostPage/Postform/Postform";
import axios from "axios";
import Wishlist from "./components/Wishlist/Wishlist";
import LoginPage from "./components/Signin/LoginPage";
import SignUp from "./components/Signup/SignUp";
import Navbar1 from "./components/Landinpage/Navbar";
import Hero from "./components/Landinpage/Hero";
import Analytics from "./components/Landinpage/Analytics";
import Newsletter from "./components/Landinpage/Newsletter";
import Cards from "./components/Landinpage/Cards";
import Footer from "./components/Landinpage/Footer";
import { Admin } from "./components/Admin";
import Forms from "./components/Landinpage/Forms";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Sidebar from "./components/AdminPage/Sidebar.jsx";
import MainDash from "./components/AdminPage/MainDash/MainDash";
import AdminHomePage from "./components/AdminPage/index";
import ProfilePage from "./components/Profile";
import SlideShow from "./components/SlideShow/SlideShow";
import Messenger from "./components/Chat/messenger/Messenger";
import Home from "./components/Myadmin/Home/Home";
import loginContext from "./index";
import Otp from "./components/Signup/otp";

function App() {
  const [color, setColor] = useState(true);
  const [elem, setElem] = useState(document.body);
  const loginStatus = useContext(loginContext);
  const [image, setImage] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* Routes that do not require authorization */}
          <Route exact path="/">
            <Navbar1 />
            <Hero />
            <Analytics />
            <Newsletter />
            <Cards />
            <Footer />
          </Route>
          <Route exact path="/signin">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/adlogin">
            <AdminLogin />
          </Route>
          <Route exact path="/Forms">
            <Forms />
          </Route>

          {/* Routes that require authorization */}
          <Route exact path="/profile/:uid">
            {/* <Navbar /> */}
            <ProfilePage />
          </Route>
          <Route exact path="/admin/:uid">
            <Admin />
            <Sidebar />
            <MainDash />
            <AdminHomePage />
          </Route>
          <Route exact path="/post/:uid">
            <Navbar />
            {/* <Space /> */}
            {/* <Space /> */}
            <Postform />
          </Route>
          <Route exact path="/navbar/:uid">
            {/* <Postform /> */}
            <Navbar />
          </Route>
          <Route exact path="/wishlist/:uid">
            <div className="HomeWrapper">
              <Navbar />
              <Space />
              <Wishlist />
            </div>
          </Route>
          <Route exact path="/home/:uid">
            <div className="HomeWrapper">
              <Navbar />
              {/* <Space /> */}
              <SlideShow />
              {/* <Space /> */}
              <Search />
              {/* <Space /> */}
              {/* <Footer /> */}
            </div>
          </Route>
          <Route exact path="/service/:uid/:pid">
            <div className="DescWrapper">
              <Navbar />
              <Description />
              {/* <Space /> */}
            </div>
          </Route>

          <Route exact path="/chat/:uid/">
            <div className="HomeWrapper">
              <Navbar />
              <Messenger />
            </div>
          </Route>
          <Route exact path="/myadmin">
            <div className="HomeWrapper">
              <Home />
            </div>
          </Route>
          <Route exact path="/otp">
            <Otp />
          </Route>
          <Route exact path="/upload">
            <form
              action="https://fsd-backend.glitch.me/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <input type="file" name="image" id="" />
              <input type="submit" value="upload" />
            </form>
          </Route>
          {/* <Route exact path="/filters"></Route> */}
          <Route path="/:any"></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
