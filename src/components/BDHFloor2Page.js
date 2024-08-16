import React, { useEffect, useState } from 'react';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor2Page = () => {
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
      'EWA.2A.001': '212',
      'EWA.2A.002': '211',
      'EWA.2A.003': '209',
      'EWA.2A.004': '208',
      'EWA.2A.005': '205',
      'EWA.2A.006': '204',
      'EWA.2A.007': '203',
      'EWA.2A.008': '202',
      'EWA.2A.009': '201',
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
      <img src="/bdh-floor-2.png" alt="BDH Floor 2" className="floor-plan-image" />
      
      {/* Highlighting classrooms based on the image layout */}
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '12.5%',
          width: '6.5%',
          height: '30.5%',
          backgroundColor: getHighlightColor(roomData['212']),
        }}
        data-tooltip={`Room 212: ${roomData['212'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '19%',
          width: '6.55%',
          height: '30.5%',
          backgroundColor: getHighlightColor(roomData['211']),
        }}
        data-tooltip={`Room 211: ${roomData['211'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '25.5%',
          width: '6.5%',
          height: '20.5%',
          backgroundColor: getHighlightColor(roomData['209']),
        }}
        data-tooltip={`Room 209: ${roomData['209'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '32%',
          width: '6.5%',
          height: '20.5%',
          backgroundColor: getHighlightColor(roomData['208']),
        }}
        data-tooltip={`Room 208: ${roomData['208'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '38.5%',
          width: '6.5%',
          height: '20.5%',
          backgroundColor: getHighlightColor(roomData['205']),
        }}
        data-tooltip={`Room 205: ${roomData['205'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '45%',
          width: '6.5%',
          height: '30.5%',
          backgroundColor: getHighlightColor(roomData['204']),
        }}
        data-tooltip={`Room 204: ${roomData['204'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '51.5%',
          width: '6.5%',
          height: '23%',
          backgroundColor: getHighlightColor(roomData['203']),
        }}
        data-tooltip={`Room 203: ${roomData['203'] || 'No data'} students`}
      ></div>

      <div
        className="highlight"
        style={{
          top: '13.5%',
          left: '58%',
          width: '7.6%',
          height: '30.5%',
          backgroundColor: getHighlightColor(roomData['202']),
        }}
        data-tooltip={`Room 202: ${roomData['202'] || 'No data'} students`}
      ></div>
      
      <div
        className="highlight"
        style={{
          top: '53%',
          left: '58%',
          width: '7.6%',
          height: '18%',
          backgroundColor: getHighlightColor(roomData['201']),
        }}
        data-tooltip={`Room 201: ${roomData['201'] || 'No data'} students`}
      ></div>
    </div>
  );
};

export default BDHFloor2Page;
