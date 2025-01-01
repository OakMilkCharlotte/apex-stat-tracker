import React from "react";

function CurrentSession({ data }) {
    console.log("Data received by CurrentSession:", data);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Calculate statistics
  const totalRP = data.reduce((sum, entry) => sum + (entry.rp || 0), 0);
  const avgRP = Math.round(totalRP / data.length) || 0;
  const avgKP = Math.round(
    data.reduce((sum, entry) => sum + (entry.teamKP || 0), 0) / data.length
  ) || 0;
  const avgPlacement = Math.round(
    data.reduce((sum, entry) => sum + (entry.placement || 0), 0) / data.length
  ) || 0;
  const numWins = data.filter((entry) => entry.placement === 1).length;

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Current Split Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>Total RP:</td>
              <td>{totalRP}</td>
            </tr>
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
    </div>
  );
}

export default CurrentSession;

























// import React from "react";
// import "./CurrentSession.css";

// function CurrentSession({ entryList }) {
//   // Calculate statistics
//   const totalRP = entryList.reduce((sum, entry) => sum + (entry.rp || 0), 0);
//   const averageRP = Math.round(totalRP / entryList.length) || 0;
//   const averageKP =
//     Math.round(
//       entryList.reduce((sum, entry) => sum + (entry.teamKP || 0), 0) /
//         entryList.length
//     ) || 0;
//   const averagePlacement =
//     Math.round(
//       entryList.reduce((sum, entry) => sum + (entry.placement || 0), 0) /
//         entryList.length
//     ) || 0;
//   const numberOfWins = entryList.filter((entry) => entry.placement === 1).length;

//   return (
//     <div className="current-session-container">
//       <div className="current-session-box">
//         <h2>Current Session</h2>
//         <table className="current-session-table">
//           <tbody>
//             <tr>
//               <td>Total RP</td>
//               <td>{totalRP}</td>
//             </tr>
//             <tr>
//               <td>Average RP</td>
//               <td>{averageRP}</td>
//             </tr>
//             <tr>
//               <td>Average KP</td>
//               <td>{averageKP}</td>
//             </tr>
//             <tr>
//               <td>Average Placement</td>
//               <td>{averagePlacement}</td>
//             </tr>
//             <tr>
//               <td>Number of Wins</td>
//               <td>{numberOfWins}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default CurrentSession;
