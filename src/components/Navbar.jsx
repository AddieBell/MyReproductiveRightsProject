import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg bg-black text-white fixed-top'>
      <div className='container-fluid'>
        <a className='navbar-brand text-white' href='#'>
          Reproductive Rights Resources
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
