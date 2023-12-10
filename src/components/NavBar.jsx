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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
        {/* { user ? <NavLink className="navbar-brand" to="/storyList"><img src="public/UlixLogo1NoBG.png" alt="Ulix" height="40"/></NavLink> : */}
        <NavLink className="navbar-brand mx-2" to="/"><img src="/UlixLogo1NoBG.png" alt="Ulix" height="40"/></NavLink> 
        <div className="nav-item">
            {user ? <img src="/Member.png" alt="Member" height="40"/> :
            <img src="/Guest.png" alt="Guest" height="40"/>}
              Hello, {user ? user.username : 'Guest'}
            </div>
        <button className="navbar-toggler" type="button" onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <div className="navbar-nav">
            { user ?
            <NavLink className="nav-item nav-link active" to="/storyList"><img src="/StoryList.png" alt="New Story" height="40"/>Your Stories</NavLink> : null }
           { user ? null : <NavLink className="nav-item nav-link active" to="/about"><img src="/About.png" alt="About" height="40"/>About</NavLink> }
            { user ? <NavLink className="nav-item nav-link" to="/storyForm"><img src="/StoryForm.png" alt="New Story" height="40"/>New Story</NavLink> : null}
            { user ? null : <NavLink className="nav-item nav-link" to="/signup"><img src="/SignUp.png" alt="Sign Up" height="40"/>Sign Up</NavLink> }
            { user ?
            <NavLink className="nav-item nav-link" to="#" onClick={handleLogout}><img src="/LogOut.png" alt="Log Out" height="40"/>Logout</NavLink> :
            <NavLink className="nav-item nav-link" to="/login"><img src="/LogIn.png" alt="Log In" height="40"/>Login</NavLink> }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;