
// Statistics.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase'; // Adjust path to your Firebase setup
import { ref, get } from 'firebase/database';
import './StatisticsPage.css'; // Add styles as needed

// Import sub-tabs
import CurrentSplit from './subtabs/CurrentSplit';
import CurrentSession from './subtabs/CurrentSession';
import AvgRPPerMap from './subtabs/AvgRPPerMap';
import AvgRPPerComp from './subtabs/AvgRPPerComp';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('CurrentSplit');
  const [splitOptions, setSplitOptions] = useState([]); // Dropdown options
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Data filtered by split

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const snapshot = await get(ref(database, 'matchData'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Raw matchData fetched from Firebase:', data);
  
          const entries = Object.values(data);
          console.log('Converted matchData to array:', entries);
  
          // Extract unique split integers (converted from strings to numbers)
          const splitIntegers = [...new Set(entries.map(entry => parseInt(entry.split, 10)))].sort((a, b) => a - b);
          console.log('Extracted split options (converted to integers):', splitIntegers);
  
          setSplitOptions(splitIntegers);
  
          // Determine max split value
          const maxSplit = Math.max(...splitIntegers);
          console.log('Max split value:', maxSplit);
  
          setSelectedSplit(maxSplit);
  
          // Filter entries by max split (compare strings to strings)
          const filtered = entries.filter(entry => parseInt(entry.split, 10) === maxSplit);
          console.log('Filtered matchData by max split:', filtered);
  
          setFilteredData(filtered);
        } else {
          console.log('No matchData found in Firebase.');
        }
      } catch (error) {
        console.error('Error fetching matchData:', error);
      }
    };
  
    fetchMatchData();
  }, []);
  
  const handleSplitChange = async (event) => {
    const newSplit = parseInt(event.target.value, 10);
    console.log('Selected split changed to:', newSplit);
  
    setSelectedSplit(newSplit);
  
    try {
      const snapshot = await get(ref(database, 'matchData'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Raw matchData fetched from Firebase on split change:', data);
  
        const entries = Object.values(data);
        console.log('Converted matchData to array on split change:', entries);
  
        // Filter entries by selected split (compare strings to strings)
        const filtered = entries.filter(entry => parseInt(entry.split, 10) === newSplit);
        console.log('Filtered matchData by selected split:', filtered);
  
        setFilteredData(filtered);
      } else {
        console.log('No matchData found in Firebase.');
      }
    } catch (error) {
      console.error('Error fetching matchData on split change:', error);
    }
  };

  return (
    <div className="statistics-page">
      {/* Sub-navigation bar */}
      <nav className="sub-nav-bar">
        {['CurrentSplit', 'CurrentSession', 'AvgRPPerMap', 'AvgRPPerComp'].map((tab) => (
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
        {activeTab === 'CurrentSplit' && <CurrentSplit data={filteredData} />}
        {activeTab === 'CurrentSession' && <CurrentSession data={filteredData} />}
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
