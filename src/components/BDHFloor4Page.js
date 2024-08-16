import React, { useEffect, useState } from 'react';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor4Page = () => {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    fetch('https://74b1zqp24m.execute-api.eu-central-1.amazonaws.com/Prod/Device')
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
      'EWA.F04.02': '434',
      'EWA.F04.05': '435',
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
      <img src="/bdh-floor-4.png" alt="BDH Floor 4" className="floor-plan-image" />
      
      {/* Highlighting rooms and offices based on the image layout */}
      <div
        className="highlight"
        style={{
          top: '29%',
          left: '52%',
          width: '14%',
          height: '24%',
          backgroundColor: getHighlightColor(roomData['434']),
        }}
        data-tooltip={`Conference Room 434: ${roomData['434'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '29%',
          left: '26.5%',
          width: '21%',
          height: '24%',
          backgroundColor: getHighlightColor(roomData['435']),
        }}
        data-tooltip={`Conference Room 435: ${roomData['435'] || 'No data'} students`}
      ></div>

      {/* Add more regions as needed */}
    </div>
  );
};

export default BDHFloor4Page;
