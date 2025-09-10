import { Link } from 'react-router-dom';

function Navbar() {
  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/services', name: 'Services' },
    { path: '/contact', name: 'Contact' }
  ];

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        {/* Company Logo/Name */}
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          MyCompany
        </Link>

        {/* Navigation Links */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '30px'
        }}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                style={{
                  color: '#ecf0f1',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ecf0f1';
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu (simplified version) */}
      <style>
        {`
          @media (max-width: 768px) {
            nav > div {
              flex-direction: column;
              gap: 15px;
            }
            nav ul {
              gap: 15px !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;