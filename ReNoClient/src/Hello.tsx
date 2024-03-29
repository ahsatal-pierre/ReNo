import React, { useEffect, useState } from 'react';

function Hello() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Response from backend: {message}</h1>
    </div>
  );
}

export default Hello;
