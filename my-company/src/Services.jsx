function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert advice on technology solutions to streamline your business operations."
    },
    {
      title: "Market Analysis", 
      description: "Comprehensive market research to help you understand your target audience."
    },
    {
      title: "Product Development",
      description: "From concept to launch, we help bring your innovative ideas to life."
    }
  ];

  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        Our Services
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{
              fontSize: '1.5rem',
              color: '#3498db',
              marginBottom: '15px'
            }}>
              {service.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#7f8c8d',
              lineHeight: '1.6'
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;