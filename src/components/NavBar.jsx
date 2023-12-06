import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../AuthProvider';
import { getAuth, signOut } from "firebase/auth";

function NavBar() {
  const user = useContext(UserContext)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        navigate('/login');  // Navigate to the login page after sign out
      })
      .catch((error) => {
        console.log("Sign out not successful: ", error);
      });
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">Ulix</NavLink>
        <button className="navbar-toggler" type="button" onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        {isOpen && (
          <div className="navbar-nav dropdown-menu">
            <NavLink className="nav-item nav-link active" to="/storyList">Stories <span className="sr-only">(current)</span></NavLink>
            <NavLink className="nav-item nav-link active" to="/about">About</NavLink>
            <NavLink className="nav-item nav-link" to="/storyForm">New Story</NavLink>
            <NavLink className="nav-item nav-link" to="./pages/myPosts">
              Hello, {user ? user.username : 'Guest'}
            </NavLink>
            <NavLink className="nav-item nav-link" to="#" onClick={handleLogout}>Logout</NavLink>
            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
          </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar;