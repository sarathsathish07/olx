import React,{useEffect,useContext} from "react";
import "./App.css";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { AuthContext, FirebaseContext } from "./Store/Context";
import Create from "./Pages/Create"
import ViewPost from "./Pages/ViewPost"
import Post from "./Store/PostContext";
import Home from "./Pages/Home";

function App() {


  const {setUser} = useContext(AuthContext)
  const {Firebase} = useContext(FirebaseContext)


  useEffect(() => {
    const unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [Firebase.auth, setUser]);


  return (
    <div>
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
  </div>
  );
}

export default App;
