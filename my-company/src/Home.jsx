function Home() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#2c3e50',
        marginBottom: '20px'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#7f8c8d',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        We are dedicated to delivering excellence in all our services. 
        Our team of professionals is committed to helping your business grow and succeed.
      </p>
    </div>
  );
}

export default Home;