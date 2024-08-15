import React, { useEffect, useState } from 'react';
import '../styles/BDHFloorHeatmap.css';

const BDHFloorHeatmap = () => {
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
      'EWA.L1A.00': '111',
      'EWA.2A1.002': '110', 
      'EWA.2A1.003': '109',
      'EWA.2A1.004': '107',
      'EWA.L1A.004': 'Lab1',
      'EWA.L1A.003': 'Lab2',
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
          height: '25%',
          backgroundColor: getHighlightColor(roomData['111']),
        }}
        data-tooltip={`Room 111: ${roomData['111'] || 'No data'} students`}
      ></div>
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '45.5%',
          width: '5%',
          height: '19.5%',
          backgroundColor: getHighlightColor(roomData['110']),
        }}
        data-tooltip={`Room 110: ${roomData['110'] || 'No data'} students`}
      ></div>
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '51%',
          width: '5%',
          height: '19.5%',
          backgroundColor: getHighlightColor(roomData['109']),
        }}
        data-tooltip={`Room 109: ${roomData['109'] || 'No data'} students`}
      ></div>
      
      {/* Additional highlighted regions */}
      <div
        className="highlight"
        style={{
          top: '24%',
          left: '61.5%',
          width: '6.5%',
          height: '19.5%',
          backgroundColor: getHighlightColor(roomData['107']),
        }}
        data-tooltip={`Room 107: ${roomData['107'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '48%',
          left: '70%',
          width: '7.5%',
          height: '49%',
          backgroundColor: getHighlightColor(roomData['Lab1']),
          transform: 'rotate(-58deg)',
          transformOrigin: 'top left',
        }}
        data-tooltip={`Lab 1: ${roomData['Lab1'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '60%',
          left: '68%',
          width: '5%',
          height: '45%',
          backgroundColor: getHighlightColor(roomData['Lab2']),
          transform: 'rotate(-58deg)',
          transformOrigin: 'top left',
        }}
        data-tooltip={`Lab 2: ${roomData['Lab2'] || 'No data'} students`}
      ></div>
    </div>
  );
};

export default BDHFloorHeatmap;
