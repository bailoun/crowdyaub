import React, { useEffect, useState } from 'react';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor5Heatmap = () => {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    fetch('/api/Device')
      .then(response => response.json())
      .then(data => {
        console.log("API Data: ", data);  // Log API response
        const mappedData = mapDeviceToRooms(data.items);
        setRoomData(mappedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const mapDeviceToRooms = (data) => {
    const deviceToRoomMapping = {
      'EWA.F05.010': '537',
      'EWA.F05.03': '536',
    };

    let roomData = {};
    data.forEach(deviceEntry => {
      const room = deviceToRoomMapping[deviceEntry.Device];
      if (room) {
        roomData[room] = parseInt(deviceEntry.UniqueClients, 10);
      }
    });

    return roomData;
  };

  const getHighlightColor = (peopleCount) => {
    if (peopleCount > 20) return 'rgba(255, 0, 0, 0.5)'; // Red with transparency
    if (peopleCount > 10) return 'rgba(255, 255, 0, 0.5)'; // Yellow with transparency
    return 'rgba(0, 255, 0, 0.5)'; // Green with transparency
  };

  return (
    <div className="floor-plan-container">
      <img src="/bdh-floor-5.png" alt="BDH Floor 5" className="floor-plan-image" />
      
      {/* Highlighting rooms and offices based on the image layout */}
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '29.5%',
          width: '21%',
          height: '23%',
          backgroundColor: getHighlightColor(roomData['537']),
        }}
        data-tooltip={`Conference Room 537: ${roomData['537'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '24%',
          left: '55%',
          width: '14%',
          height: '23%',
          backgroundColor: getHighlightColor(roomData['536']),
        }}
        data-tooltip={`Conference Room 536: ${roomData['536'] || 'No data'} students`}
      ></div>

      {/* Add more regions as needed */}
    </div>
  );
};

export default BDHFloor5Heatmap;
