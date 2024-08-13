import React, { useEffect, useState } from 'react';
import '../styles/BDHFloorHeatmap.css';

const BDHFloorHeatmap = () => {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    // Use the full API URL for production
    const apiUrl = 'https://74b1zqp24m.execute-api.eu-central-1.amazonaws.com/Prod/Device';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
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
      'ACC.L1A.004': '111',
      'EWA.L1A.007': '112', 
      'EWA.F03.20': '113',
      // Add more mappings based on your device-room relationship
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
      <img src="/bdh-floor-1.png" alt="BDH Floor 1" className="floor-plan-image" />
      
      {/* Highlighting classrooms based on the image layout */}
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '40%',
          width: '5%',
          height: '107px',
          backgroundColor: getHighlightColor(roomData['111']),
        }}
        data-tooltip={`Classroom 111: ${roomData['111'] || 'No data'} students`}
      ></div>
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '45.5%',
          width: '5%',
          height: '107px',
          backgroundColor: getHighlightColor(roomData['112']),
        }}
        data-tooltip={`Classroom 112: ${roomData['112'] || 'No data'} students`}
      ></div>
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '50.5%',
          width: '5%',
          height: '107px',
          backgroundColor: getHighlightColor(roomData['113']),
        }}
        data-tooltip={`Classroom 113: ${roomData['113'] || 'No data'} students`}
      ></div>
      {/* Add more classrooms as needed */}
    </div>
  );
};

export default BDHFloorHeatmap;
