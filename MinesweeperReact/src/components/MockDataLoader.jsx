/* eslint-disable */
import React, { useState, useEffect } from 'react';

export function MockDataLoader({ onSubmit }) {
  const [showForm, setShowForm] = useState(true);
  const [mockData, setMockData] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        setShowForm(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(mockData);
    setMockData('');
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <form onSubmit={handleSubmit}>
            <h1 className='subtitle'>Mock Data: </h1>
          <label>
            <textarea
              value={mockData}
              onChange={(event) => setMockData(event.target.value)}
              data-testid='mockData-text'
            />
          </label>
          <div>
          <button className='mockData-submit' type="submit" data-testid="mockData-submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
}

export default MockDataLoader;