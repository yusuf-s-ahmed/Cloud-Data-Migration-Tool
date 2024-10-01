import React, { useState } from 'react';
import './App.css'; // Make sure to import your CSS file

const MigrationForm = () => {
  const [mysqlConn, setMysqlConn] = useState('');
  const [mongoConn, setMongoConn] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/migrate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mysql_conn: mysqlConn,
        mongo_conn: mongoConn,
        mysql_table: 'users', // You can also create an input for this
        mongo_collection: 'users_data', // Same as above
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="migration-container">
      <h1 className="migration-title">Cloud Database Migration Tool</h1>
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
        <button type="submit" className="form-button">Migrate Data</button>
      </form>
      {message && <p className="migration-message">{message}</p>}
    </div>
  );
};

export default MigrationForm;
