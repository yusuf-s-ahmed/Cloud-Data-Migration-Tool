import React, { useState } from 'react';
import './App.css'; // Import your CSS

const MigrationForm = () => {
  const [mysqlConn, setMysqlConn] = useState('');
  const [mongoConn, setMongoConn] = useState('');
  const [mysqlTable, setMysqlTable] = useState('');
  const [mongoCollection, setMongoCollection] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [connected, setConnected] = useState(false);
  const [tickOpacity, setTickOpacity] = useState(0);
  const [showGuide, setShowGuide] = useState(false); // State for showing usage guide

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setConnected(false);
    setStatus('');

    if (!mysqlConn || !mongoConn || !mysqlTable || !mongoCollection) {
      setMessage('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    setStatus('CONNECTING...');

    try {
      const response = await fetch('http://127.0.0.1:8000/migrate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mysql_conn: mysqlConn,
          mongo_conn: mongoConn,
          mysql_table: mysqlTable,
          mongo_collection: mongoCollection,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message || data.error);

      // Set connected and tick opacity after a successful migration
      setConnected(true);
      setTickOpacity(1); // Make the ticks visible
      setTimeout(() => {
        setStatus('SUCCESS');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setStatus('');
      setConnected(false); // Reset if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <span className="navbar-text">
            <span className="created-by">Created By</span> Yusuf Salman Ahmed
          </span>
          <div className="vertical-line"></div>
          <div className="navbar-icons">
            <a href="https://github.com/yusuf-s-ahmed" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github" style={{ color: "#000000", fontSize: "24px" }}></i>
            </a>
            <a href="https://linkedin.com/in/yusuf-s-ahmed" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin" style={{ color: "#000000", fontSize: "24px" }}></i>
            </a>
          </div>
        </div>
      </nav>

      {/* Cloud image above the form */}
      <div className="cloud-container">
        <img 
          src={`${process.env.PUBLIC_URL}/cloud.png`} 
          alt="Migration Tool" 
          className="migration-image" 
        />
        <div className="hero-text">
          <h1 className="hero-title">Data Migration Tool</h1>
          <p className="hero-subtext">Cloud-based SQL to NoSQL data migration.</p>
        </div>
      </div>

      {/* Checked images for MySQL and MongoDB */}
      <div className="image-container">
        <div className="logo-container">
          <img 
            id="mysql" 
            className="mysql" 
            src={`${process.env.PUBLIC_URL}/mysql-logo.png`} 
            alt="MySQL Connected" 
          />
          {connected && <i id="check1" className="fa-solid fa-check" style={{ color: '#0056b3', opacity: tickOpacity }}></i>}
        </div>

        <span className="connecting-text">{status}</span>

        <div className="logo-container">
          <img 
            src={`${process.env.PUBLIC_URL}/mongodb-logo.png`} 
            alt="MongoDB Connected" 
          />
          {connected && <i id="check2" className="fa-solid fa-check" style={{ color: '#0056b3', opacity: tickOpacity }}></i>}
        </div>
      </div>

      <div className="migration-container">
        <div className="migration-header">
          <h1 className="migration-title">Cloud Database Migration Tool</h1>
          <div 
            className="help-icon"
            onClick={() => setShowGuide(!showGuide)} 
            onMouseEnter={() => setShowGuide(true)}
            onMouseLeave={() => setShowGuide(false)}
          >
            <div className="circle">
              <span className="question-mark">?</span>
            </div>
            {showGuide && (
              <div className="usage-guide-tooltip">
                Not sure how to use this? Visit my Github repository 
                <a href="https://github.com/yusuf-s-ahmed/Data-Migration-Tool" target="_blank" className="link"> here</a>
              </div>
            )}
          </div>
        </div>

        <form className="migration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">MySQL Connection String:</label>
            <input
              type="text"
              className="form-input"
              value={mysqlConn}
              onChange={(e) => setMysqlConn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">MongoDB Connection String:</label>
            <input
              type="text"
              className="form-input"
              value={mongoConn}
              onChange={(e) => setMongoConn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">MySQL Table Name:</label>
            <input
              type="text"
              className="form-input"
              value={mysqlTable}
              onChange={(e) => setMysqlTable(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">MongoDB Collection Name:</label>
            <input
              type="text"
              className="form-input"
              value={mongoCollection}
              onChange={(e) => setMongoCollection(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Migrating...' : 'Migrate Data'}
          </button>
        </form>
        {message && <p className="migration-message">{message}</p>}
      </div>
    </div>
  );
};

export default MigrationForm;
