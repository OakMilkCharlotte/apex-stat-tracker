// Statistics.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase'; // Adjust path to your Firebase setup
import { ref, get } from 'firebase/database';
import './StatisticsPage.css'; // Add styles as needed

// Import sub-tabs
import CurrentSession from './subtabs/CurrentSession';
import RPOverSplit from './subtabs/RPOverSplit';
import AvgRPPerMap from './subtabs/AvgRPPerMap';
import AvgRPPerComp from './subtabs/AvgRPPerComp';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('CurrentSession');
  const [splitOptions, setSplitOptions] = useState([]); // Dropdown options
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Data filtered by split

  useEffect(() => {
    // Fetch match data on load
    const fetchMatchData = async () => {
      try {
        const snapshot = await get(ref(database, 'matchData'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const entries = Object.values(data);

          // Extract unique split integers
          const splitIntegers = [...new Set(entries.map(entry => entry.split))].sort((a, b) => a - b);
          setSplitOptions(splitIntegers);

          // Determine max split value
          const maxSplit = Math.max(...splitIntegers);
          setSelectedSplit(maxSplit);

          // Filter entries by max split
          const filtered = entries.filter(entry => entry.split === maxSplit);
          setFilteredData(filtered);
        }
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, []);

  const handleSplitChange = async (event) => {
    const newSplit = parseInt(event.target.value, 10);
    setSelectedSplit(newSplit);

    try {
      const snapshot = await get(ref(database, 'matchData'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const entries = Object.values(data);

        // Filter entries by selected split
        const filtered = entries.filter(entry => entry.split === newSplit);
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  };

  return (
    <div className="statistics-page">
      {/* Sub-navigation bar */}
      <nav className="sub-nav-bar">
        {['CurrentSession', 'RPOverSplit', 'AvgRPPerMap', 'AvgRPPerComp'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'sub-nav-link active' : 'sub-nav-link'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </nav>

      {/* Content area for sub-tabs */}
      <div className="tab-content">
        {activeTab === 'CurrentSession' && <CurrentSession data={filteredData} />}
        {activeTab === 'RPOverSplit' && <RPOverSplit data={filteredData} />}
        {activeTab === 'AvgRPPerMap' && <AvgRPPerMap data={filteredData} />}
        {activeTab === 'AvgRPPerComp' && <AvgRPPerComp data={filteredData} />}
      </div>

      {/* Bottom bar with dropdown */}
      <div className="footer-bar">
        <label htmlFor="split-dropdown" className="split-label">Split:</label>
        <select
          id="split-dropdown"
          className="split-dropdown"
          value={selectedSplit || ''}
          onChange={handleSplitChange}
        >
          {splitOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Statistics;
