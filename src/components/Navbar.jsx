import logo from "../assets/1.png";

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <img
            src={logo}
            alt='Brand Logo'
            width='150' // Adjust the width if needed
            height='auto'
            className='d-inline-block align-top navbar-logo'
          />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/search'>
                Search
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/about'>
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
