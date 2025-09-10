function About() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        About Us
      </h1>
      <div style={{
        backgroundColor: '#ecf0f1',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#34495e',
          marginBottom: '20px'
        }}>
          Our company has been providing top-notch services since 1990. We specialize in various fields 
          including technology, marketing, and consultancy.
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#34495e',
          marginBottom: '20px'
        }}>
          With over 30 years of experience, we have helped hundreds of businesses achieve their goals 
          through innovative solutions and dedicated support.
        </p>
        <div style={{
          borderLeft: '4px solid #3498db',
          paddingLeft: '20px',
          marginTop: '30px'
        }}>
          <p style={{ 
            fontSize: '1rem', 
            color: '#7f8c8d',
            fontStyle: 'italic'
          }}>
            "Excellence is not a destination; it's a continuous journey that never ends."
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;