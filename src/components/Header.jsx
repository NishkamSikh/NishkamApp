import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {

    localStorage.removeItem('UserauthToken');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserId');
    // window.location.reload(true);
  }

  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          Sikligar App
        </Link>

        {/* for large screens */}
        <Navbar />
        <Link to="/" onClick={handleLogout} className="menu-items">
          Logout
        </Link>

        {/* for small screens */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
