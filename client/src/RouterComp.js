import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavComponent from "./components/NavComponent";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import AuthContext from "./context/authContext";
import { useContext } from "react";
import ErrorComponent from "./components/ErrorComponent";
import AddBlog from "./components/AddBlog";
import People from "./components/People";
import SearchBlogs from "./components/SearchBlogs";
import UpdateBlog from './components/updateBlog'
function RouterComP() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Router>
      <>
        <NavComponent />
        <Switch>
          <Route exact path="/">
            <Home />{" "}
          </Route>
          <Route exact path="/blog/add">
            <AddBlog  />
          </Route>
          <Route exact path="/blog/update">
            <UpdateBlog
            />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/user/signUp">
            <Register />{" "}
          </Route>
          <Route exact path="/user/login">
            <Login />{" "}
          </Route>

          <Route exact path="/user/logout">
            <Logout />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/user/find">
            <People />
          </Route>
          <Route>
            {" "}
            <ErrorComponent />{" "}
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default RouterComP;
