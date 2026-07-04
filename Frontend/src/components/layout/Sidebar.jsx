import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem
("user"));


   
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  
  return (
    <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
      <div className="sidebar-logo">
        <h2>Welcome</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/products" onClick={() => setSidebarOpen(false)}>
            <FaBox />
            <span>Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" onClick={() => setSidebarOpen(false)}>
            <FaShoppingCart />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/expenses" onClick={() => setSidebarOpen(false)}>
            <FaMoneyBillWave />
            <span>Expenses</span>
          </NavLink>
        </li>
      </ul>

      <button className="logout-btn" onClick={() => setSidebarOpen(false)}
        onClick={handleLogout}
        
        >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
