import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  return (
    <nav>
      <h1 className="top_left">
        <Link to="/">Textelope</Link>
      </h1>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="top_right">
              Register
            </Link>
            <Link to="/login" className="top_right">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
