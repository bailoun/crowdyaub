import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor4Page = () => {
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
      'EWA.F04.02': '434',
      'EWA.F04.05': '435',
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
    navigate('/bdh/floor-5');
  };

  const goToPreviousFloor = () => {
    navigate('/bdh/floor-2');
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
        data-tooltip={getTooltipText('434', roomData['434'])}
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
        data-tooltip={getTooltipText('435', roomData['435'])}
      ></div>

      {/* Navigation buttons */}
      <button className="next-floor-button" onClick={goToNextFloor}>
        Next Floor &gt;
      </button>

      <button className="previous-floor-button" onClick={goToPreviousFloor}>
        &lt; Previous Floor
      </button>
    </div>
  );
};

export default BDHFloor4Page;
