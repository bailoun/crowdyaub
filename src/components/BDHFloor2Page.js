import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor2Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://wm1zuhiuwf.execute-api.eu-central-1.amazonaws.com/Prod/devices')
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data: ", data);
        const mappedData = mapDeviceToRooms(data.items);
        setRoomData(mappedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const mapDeviceToRooms = (data) => {
    const deviceToRoomMapping = {
      'EWA.L2A.00': '211',
      'EWA.2A2.002': '210',
      'EWA.2A2.003': '209',
      'EWA.2A2.004': '207',
      'EWA.L2A.004': 'Lab1',
      'EWA.L2A.003': 'Lab2',
    };

    let roomData = {};
    data.forEach((deviceEntry) => {
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

  const goToNextFloor = () => {
    navigate('/bdh/floor-4');
  };

  const goToPreviousFloor = () => {
    navigate('/bdh/floor-1');
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

      <button className="next-floor-button" onClick={goToNextFloor}>
        Next Floor &gt;
      </button>

      <button className="previous-floor-button" onClick={goToPreviousFloor}>
        &lt; Previous Floor
      </button>
    </div>
  );
};

export default BDHFloor2Page;
