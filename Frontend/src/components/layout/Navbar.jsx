import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";


function Navbar({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar-custom">

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h3>Business Tracker</h3>

      </div>

      <div className="navbar-right">

        <FaBell className="icon"/>

        <div className="profile">
          <FaUserCircle />
          <span>{user?.name}</span>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;