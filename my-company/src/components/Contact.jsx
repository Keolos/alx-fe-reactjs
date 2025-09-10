import { useState } from 'react';

function Contact() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields!');
      return;
    }
    
    alert(`Thank you ${formData.name}! Your message has been submitted.`);
    
    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#ecf0f1',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Contact Us
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#7f8c8d',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#34495e',
              fontWeight: 'bold'
            }}>
              Your Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#34495e',
              fontWeight: 'bold'
            }}>
              Your Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#34495e',
              fontWeight: 'bold'
            }}>
              Your Message:
            </label>
            <textarea
              name="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;