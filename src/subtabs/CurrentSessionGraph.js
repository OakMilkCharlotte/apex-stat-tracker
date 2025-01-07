import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";



// Custom plugin for alternating background colors
const alternatingBackgroundPlugin = {
  id: "alternatingBackground",
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales, data } = chart;
    const { left, right, top, bottom } = chartArea;
    const { x } = scales;

    if (!x.ticks || x.ticks.length === 0) return;

    const labels = data.labels; // Use the chart's labels
    let previousDate = null;
    let currentColor = "#595859"; // Start with light gray

    for (let i = 0; i < labels.length; i++) {
      const date = new Date(labels[i]).toLocaleDateString("en-US");

      if (date !== previousDate) {
        // Alternate the color for a new date
        currentColor = currentColor === "#595859" ? "#686869" : "#595859";
        previousDate = date;
      }

      const tickStart = x.getPixelForValue(i);
      const tickEnd =
        i < labels.length - 1
          ? x.getPixelForValue(i + 1)
          : right;

      // Draw the background rectangle
      ctx.save();
      ctx.fillStyle = currentColor;
      ctx.fillRect(tickStart, top, tickEnd - tickStart, bottom - top);
      ctx.restore();
    }
  },
};

// Plugin that highlights a vertical line intersecting nearest x values
const verticalHoverLinePlugin = {
  id: "verticalHoverLine",
  afterDraw: (chart) => {
    const { tooltip } = chart;
  if (!tooltip || !tooltip.getActiveElements().length) {
    return; // Exit early if tooltip is not defined or there are no active elements
  }
    const { ctx, chartArea, scales } = chart;
    const { top, bottom } = chartArea;
    const { x } = scales;

    // Check if the tooltip is active (hovering over a data point)
    if (tooltip._active && tooltip._active.length) {
      const activePoint = tooltip._active[0]; // Get the active data point
      const xPosition = activePoint.element.x; // X position of the active data point

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xPosition, top);
      ctx.lineTo(xPosition, bottom);
      ctx.lineWidth = 2; // Thin line
      ctx.strokeStyle = "darkgray"; // Color of the vertical line
      ctx.stroke();
      ctx.restore();
    }
  },
};

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  alternatingBackgroundPlugin,
  verticalHoverLinePlugin
);


const normalizeData = (values, invert = false) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map(value => {
    const normalized = (value - min) / (max - min); // Normalize to [0, 1]
    return invert ? 1 - normalized : normalized;   // Invert if needed
  });
};

function CurrentSessionGraph({ data }) {
  const dates = data.map(entry => entry.date); // X-axis values (dates)
  const placementData = normalizeData(data.map(entry => entry.placement), true); // Inverted
  const rpData = normalizeData(data.map(entry => entry.rp));
  const teamKPData = normalizeData(data.map(entry => entry.teamKP));
  const rankData = normalizeData(
    data.map(entry => ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum IV', 'Platinum III', 'Platinum II', 
      'Platinum I', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I', 'Masters', 
      'Apex Predator'].indexOf(entry.rank))
  );

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Placement",
        data: placementData,
        originalData: data.map(entry => entry.placement),
        borderColor: "#fcaee9",
        backgroundColor: "#d169c3",
        pointHoverBackgroundColor: "#d169c3",
        fill: false,
        tension: 0.4,
        pointHoverRadius: 15,
        pointRadius: 5,
        pointStyle: "circle",
      },
      {
        label: "RP",
        data: rpData,
        originalData: data.map(entry => entry.rp),
        borderColor: "#69d1b9",
        backgroundColor: "#42a890",
        pointHoverBackgroundColor: "#42a890",
        fill: false,
        tension: 0.4,
        pointHoverRadius: 15,
        pointRadius: 5,
        pointStyle: "circle",
      },
      {
        label: "Team KP",
        data: teamKPData,
        originalData: data.map(entry => entry.teamKP),
        borderColor: "#d6c36d",
        backgroundColor: "#b3a04d",
        pointHoverBackgroundColor: "#b3a04d",
        fill: false,
        tension: 0.4,
        pointHoverRadius: 15,
        pointRadius: 5,
        pointStyle: "circle",
      },
      {
        label: "Rank",
        data: rankData,
        originalData: data.map(entry => entry.rank),
        borderColor: "#866ad9",
        backgroundColor: "#634bad",
        pointHoverBackgroundColor: "#634bad",
        fill: false,
        tension: 0.4,
        pointHoverRadius: 15,
        pointRadius: 5,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      bodyFont: {
        size: 24, // Double the font size for the tooltip body
      },
      titleFont: {
        size: 28, // Double the font size for the tooltip title
      },
      padding: 16, // Increase the padding around the tooltip
      caretSize: 10, // Adjust the caret size (the little pointer)
      boxPadding: 10, // Increase padding around the tooltip box
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const originalValue = dataset.originalData[index]; // Access the original value
            return `${dataset.label}: ${originalValue}`;
          },
        },
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          font: {
            size: 18, // Set the font size of the legend labels
          },
          color: "#fcaee9", // Change the color of the legend labels
          padding: 20, // Optional: Increase spacing between legend items
        },
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value, index) {
            const date = new Date(chartData.labels[index]);
            return date.toLocaleDateString("en-US");
          },
        },
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  return <Line data={chartData} options={options} />;
}

export default CurrentSessionGraph;
