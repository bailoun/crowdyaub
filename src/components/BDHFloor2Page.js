import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorHeatmap.css';

const BDHFloor2Page = () => {
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
        data-tooltip={getTooltipText('212', roomData['212'])}
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
        data-tooltip={getTooltipText('211', roomData['211'])}
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
        data-tooltip={getTooltipText('209', roomData['209'])}
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
        data-tooltip={getTooltipText('208', roomData['208'])}
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
        data-tooltip={getTooltipText('205', roomData['205'])}
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
        data-tooltip={getTooltipText('204', roomData['204'])}
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
        data-tooltip={getTooltipText('203', roomData['203'])}
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
        data-tooltip={getTooltipText('202', roomData['202'])}
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
        data-tooltip={getTooltipText('201', roomData['201'])}
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
