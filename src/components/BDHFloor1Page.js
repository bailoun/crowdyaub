import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor1Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
     fetch('https://3oiryog5g8.execute-api.eu-central-1.amazonaws.com/Prod/devices')
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data: ", data);
        const mappedData = mapDeviceToRooms(data);
        setRoomData(mappedData);
      })
      .catch((error) => {
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
    Object.keys(deviceToRoomMapping).forEach((device) => {
      const room = deviceToRoomMapping[device];
      if (data[device]) {
        roomData[room] = parseInt(data[device].UserCount, 10);
      } else {
        roomData[room] = null; // Mark as no data
      }
    });

    return roomData;
  };

  const getHighlightColor = (peopleCount) => {
    if (peopleCount > 20) return 'rgba(255, 0, 0, 0.5)'; // Red with transparency
    if (peopleCount > 10) return 'rgba(255, 255, 0, 0.5)'; // Yellow with transparency
    return 'rgba(0, 255, 0, 0.5)'; // Green with transparency
  };

  const getTooltipText = (room, count) => {
    if (count === null) return `Room ${room}: No data`;
    return `Room ${room}: ${count} students`;
  };

  const goToNextFloor = () => {
    navigate('/bdh/floor-2');
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
        data-tooltip={getTooltipText('111', roomData['111'])}
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
        data-tooltip={getTooltipText('110', roomData['110'])}
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
        data-tooltip={getTooltipText('109', roomData['109'])}
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
        data-tooltip={getTooltipText('107', roomData['107'])}
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
        data-tooltip={getTooltipText('Lab1', roomData['Lab1'])}
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
        data-tooltip={getTooltipText('Lab2', roomData['Lab2'])}
      ></div>

      <button className="next-floor-button" onClick={goToNextFloor}>
        Next Floor &gt;
      </button>
    </div>
  );
};

export default BDHFloor1Page;
