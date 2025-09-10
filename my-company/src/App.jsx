import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}>
        {/* Navigation appears on all pages */}
        <Navbar />
        
        {/* Main content area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer appears on all pages */}
        <footer style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          textAlign: 'center',
          padding: '30px 20px',
          marginTop: '50px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <p style={{
              margin: '0 0 10px 0',
              fontSize: '1rem'
            }}>
              © 2024 MyCompany. All rights reserved.
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#bdc3c7'
            }}>
              Built with React & React Router
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;