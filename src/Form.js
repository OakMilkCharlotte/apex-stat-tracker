import React, { useState } from 'react';
import './FormPage.css';
import { database } from './firebase'; // Adjust path to your Firebase setup
import { ref, set } from 'firebase/database';

const legends = ["Legend1", "Legend2", "Legend3", /* Add more options here */];

const FormPage = () => {
  // Group 1 state
  const [placement, setPlacement] = useState(20);
  const [teamKP, setTeamKP] = useState(0);
  const [rp, setRP] = useState(0);
  const [reason, setReason] = useState('');
  const [landing, setLanding] = useState('');

  // Group 2 state
  const [split, setSplit] = useState('Select');
  const [rank, setRank] = useState('Select');
  const [map, setMap] = useState('Select');
  const [legend1, setLegend1] = useState('Select');
  const [legend2, setLegend2] = useState('Select');
  const [legend3, setLegend3] = useState('Select');

  // Group 2 Options
  const splitOptions = [1];     // Creates an array [1, 2, 3, ..., 10]

  const rankOptions = ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum IV', 'Platinum III', 'Platinum II', 
    'Platinum I', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I', 'Masters', 'Apex Predator'];

  const mapOptions = ['E-District', 'Broken Moon', 'Kings Canyon', 'World\'s Edge', 'Olympus', 'Storm Point'];

  const legendOptions = [
    'Alter', 'Ash', 'Ballistic', 'Bangalore', 'Bloodhunter', 'Catalyst', 'Caustic', 'Conduit', 
    'Crypto', 'Fuse', 'Gibraltar', 'Horizon', 'Lifeline', 'Loba', 'Mad Maggie', 'Mirage', 'Newcastle', 
    'Octane', 'Pathfinder', 'Rampart', 'Revenant', 'Seer', 'Valkyrie', 'Vantage', 'Wattson', 'Wraith'
  ];

  
  const [error, setError] = useState('');

 

  const isFormValid = () => {
    return (
      placement && teamKP !== null && rp !== null && reason.trim() &&
      split !== 'Select' && rank !== 'Select' && map !== 'Select' &&
      legend1 !== 'Select' && legend2 !== 'Select' && legend3 !== 'Select'
    );
  };


  const writeDataToFirebase = (formData) => {
    const userId = new Date().getTime(); // Use timestamp as unique ID
    set(ref(database, `matchData/${userId}`), formData)
      .then(() => {
        console.log('Data written successfully!');
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('Error writing data:', error);
        alert('An error occurred while submitting the form.');
      });
  };


  const handleSubmit = () => {
    if (!Number.isInteger(placement) || !Number.isInteger(teamKP) || isNaN(parseInt(rp))) {
      setError('Please ensure all integer fields have valid integer values.');
      return;
    }
    setError('');

    const formData = {
      placement,
      teamKP,
      rp,
      reason,
      landing,
      split,
      rank,
      map,
      legend1,
      legend2,
      legend3,
      date: new Date().toISOString(),
    };

    // Write to Firebase
    writeDataToFirebase(formData);

    console.log('Form Submitted:', formData);

    // Reset Group 1 fields
    setPlacement(20);
    setTeamKP(0);
    setRP(0);
    setReason('');
    setLanding('');
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Submit Match Data</h2>

        {/* Placement */}
        <div className="form-group">
          <label><strong>Placement</strong></label>
          <input
            type="range"
            min="1"
            max="20"
            value={placement}
            onChange={(e) => setPlacement(parseInt(e.target.value))}
            className="reversed-range custom-placement-slider"
            
          />
          <span>{placement}</span>
        </div>

        {/* Team KP */}
        <div className="form-group">
          <label><strong>Team KP</strong></label>
          <input
            type="range"
            min="0"
            max="20"
            value={teamKP}
            onChange={(e) => setTeamKP(parseInt(e.target.value))}
          />
          <span>{teamKP}</span>
        </div>

        {/* RP */}
        <div className="form-group">
          <label><strong>RP</strong></label>
          <input
            type="range"
            min="-100"
            max="400"
            value={rp}
            onChange={(e) => setRP(parseInt(e.target.value))}
          />
          <span>{rp}</span>
        </div>

        {/* Reason We Died */}
        <div className="form-group">
          <label><strong>Reason We Died</strong></label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Landing */}
        <div className="form-group">
          <label><strong>Landing Site</strong></label>
          <input
            type="text"
            placeholder="Enter landing site"
            style={{
              padding: '5px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '150px',
              background: 'lightgray',
            }}
          />
        </div>

        {/* Split */}
        <div className="form-group">
          <label><strong>Split</strong></label>
          <select value={split} onChange={(e) => setSplit(e.target.value)}>
            <option value="Select">Select</option>
            {splitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Rank */}
        <div className="form-group">
          <label><strong>Rank</strong></label>
          <select value={rank} onChange={(e) => setRank(e.target.value)}>
            <option value="Select">Select</option>
            {rankOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Map */}
        <div className="form-group">
          <label><strong>Map</strong></label>
          <select value={map} onChange={(e) => setMap(e.target.value)}>
            <option value="Select">Select</option>
            {mapOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* HighFiveGod's Legend */}
        <div className="form-group">
          <label><strong>HighFiveGod's Legend</strong></label>
          <select value={legend1} onChange={(e) => setLegend1(e.target.value)}>
            <option value="Select">Select</option>
            {legendOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* TheGrumbleBear's Legend */}
        <div className="form-group">
          <label><strong>TheGrumbleBear's Legend</strong></label>
          <select value={legend2} onChange={(e) => setLegend2(e.target.value)}>
            <option value="Select">Select</option>
            {legendOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* OakMilkCharlotte's Legend */}
        <div className="form-group">
          <label><strong>OakMilkCharlotte's Legend</strong></label>
          <select value={legend3} onChange={(e) => setLegend3(e.target.value)}>
            <option value="Select">Select</option>
            {legendOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          disabled={!isFormValid()}
          onClick={handleSubmit}
          className={isFormValid() ? 'submit-button enabled' : 'submit-button disabled'}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormPage;


// Placement
// RP Gained
// Team KP
// Reason we died

// Split #
// Rank
// Date
// Map
// HighFiveGod's Legend
// TheGrumbleBear's Legend
// OakMilkCharlotte's Legend