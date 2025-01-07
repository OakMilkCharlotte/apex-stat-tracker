import React from "react";
import CurrentSessionGraph from "./CurrentSessionGraph";
import './CurrentSplit.css';

function CurrentSplit({ data }) {
  console.log("Data received by CurrentSplit:", data);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Helper function to parse and compare dates
  const parseDate = (dateString) => {
    // Convert "1/1/2025, 8:39:45 PM" into a Date object
    const [datePart] = dateString.split(","); // Extract just the date part (e.g., "1/1/2025")
    return new Date(datePart); // Create a Date object for comparison
  };

  // Helper function to get the most recent date
  const getMostRecentDate = (entries) => {
    const dates = entries.map((entry) => parseDate(entry.date));
    return new Date(Math.max(...dates)); // Return the most recent Date object
  };

  // Get the most recent date and format it to compare
  const mostRecentDate = getMostRecentDate(data);
  const mostRecentDateString = mostRecentDate.toLocaleDateString("en-US"); // Format as "MM/DD/YYYY"

  // Filter entries for the most recent date
  const recentDayData = data.filter((entry) => {
    const entryDate = parseDate(entry.date).toLocaleDateString("en-US"); // Format as "MM/DD/YYYY"
    return entryDate === mostRecentDateString; // Compare formatted dates
  });

  console.log("Most recent day data:");
  console.log(recentDayData);

  // Calculate statistics for all data
  const totalRP = data.reduce((sum, entry) => sum + (entry.rp || 0), 0);
  const avgRP = Math.round(totalRP / data.length) || 0;
  const avgKP = Math.round(
    data.reduce((sum, entry) => sum + (entry.teamKP || 0), 0) / data.length
  ) || 0;
  const avgPlacement = Math.round(
    data.reduce((sum, entry) => sum + (entry.placement || 0), 0) / data.length
  ) || 0;
  const numWins = data.filter((entry) => entry.placement === 1).length;

  // Calculate statistics for recent day data
  const recentTotalRP = recentDayData.reduce((sum, entry) => sum + (entry.rp || 0), 0);
  const recentAvgRP = Math.round(recentTotalRP / recentDayData.length) || 0;
  const recentAvgKP = Math.round(
    recentDayData.reduce((sum, entry) => sum + (entry.teamKP || 0), 0) / recentDayData.length
  ) || 0;
  const recentAvgPlacement = Math.round(
    recentDayData.reduce((sum, entry) => sum + (entry.placement || 0), 0) / recentDayData.length
  ) || 0;
  const recentNumWins = recentDayData.filter((entry) => entry.placement === 1).length;

  return (
    <div className="form-container">
      {/* Box for all data */}
      <div className="form-box">
        <h2>Current Split Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>Average RP:</td>
              <td>{avgRP}</td>
            </tr>
            <tr>
              <td>Average KP:</td>
              <td>{avgKP}</td>
            </tr>
            <tr>
              <td>Average Placement:</td>
              <td>{avgPlacement}</td>
            </tr>
            <tr>
              <td>Number of Wins:</td>
              <td>{numWins}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="form-box-graph">
        <h2>Graphical Overview</h2>
        <CurrentSessionGraph data={data} />
      </div>


    </div>
  );
}

export default CurrentSplit;

