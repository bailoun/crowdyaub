import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorPage.css';

const BDHFloor2Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const mapDeviceToRooms = useCallback((data) => {
    const deviceToRoomMapping = {
      'EWA.L2A.001': 'Room 212',
      'EWA.L2A.002': 'Room 211',
      'EWA.L2A.003': 'Room 209',
      'EWA.L2A.004': 'Room 208',
      'EWA.L2A.005': 'Room 205',
      'EWA.L2A.006': 'Room 204',
      'EWA.L2A.007': 'Room 203',
      'EWA.L2A.008': 'Room 202',
      'EWA.L2A.009': 'Room 201',
    };

    const capacities = {
      'Room 212': 60,
      'Room 211': 60,
      'Room 209': 42,
      'Room 208': 42,
      'Room 205': 48,
      'Room 204': 60,
      'Room 203': 48,
      'Room 202': 80,
      'Room 201': 30,
    };

    let roomData = {};
    Object.keys(deviceToRoomMapping).forEach((device) => {
      const room = deviceToRoomMapping[device];
      const capacity = capacities[room];
      if (data[device]) {
        const currentStudents = parseInt(data[device].UserCount, 10);
        roomData[room] = {
          currentStudents,
          capacity,
          status: getRoomStatus(currentStudents, capacity),
        };
      } else {
        roomData[room] = {
          currentStudents: 0,
          capacity,
          status: getRoomStatus(0, capacity),
        };
      }
    });

    return roomData;
  }, []);

  const getRoomStatus = (currentStudents, capacity) => {
    if (currentStudents <= 0.25 * capacity) return 'Almost Empty';
    if (currentStudents < 0.75 * capacity) return 'Half Capacity';
    return 'Full Capacity';
  };

  useEffect(() => {
    fetch('https://3oiryog5g8.execute-api.eu-central-1.amazonaws.com/Prod/devices')
      .then((response) => response.json())
      .then((data) => {
        const mappedData = mapDeviceToRooms(data);
        setRoomData(mappedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [mapDeviceToRooms]);

  const getHighlightColor = (status) => {
    switch (status) {
      case 'Almost Empty':
        return 'rgba(0, 255, 0, 0.5)'; // Green
      case 'Half Capacity':
        return 'rgba(255, 255, 0, 0.5)'; // Yellow
      case 'Full Capacity':
        return 'rgba(255, 0, 0, 0.5)'; // Red
      default:
        return 'rgba(0, 255, 0, 0.5)'; // Default to Green
    }
  };

  const getTooltipText = (room, data) => {
    return !data || data.currentStudents === null
      ? `${room}: No data`
      : `${room}: ${data.currentStudents} students`;
  };

  const goToNextFloor = () => {
    navigate('/bdh/floor-4');
  };

  const goToPreviousFloor = () => {
    navigate('/bdh/floor-1');
  };

  return (
    <div className="floor-plan-container">
      <h1>BDH Floor 2</h1>
      <div className="floor-plan-image-container">
        <img src="/bdh-floor-2.png" alt="BDH Floor 2" className="floor-plan-image" />
        {roomData['Room 212'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '12.5%',
              width: '6.5%',
              height: '30%',
              backgroundColor: getHighlightColor(roomData['Room 212'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 212', roomData['Room 212'])}
          ></div>
        )}
        {roomData['Room 211'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '19%',
              width: '6.5%',
              height: '30%',
              backgroundColor: getHighlightColor(roomData['Room 211'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 211', roomData['Room 211'])}
          ></div>
        )}
        {roomData['Room 209'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '25.5%',
              width: '6.5%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 209'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 209', roomData['Room 209'])}
          ></div>
        )}
        {roomData['Room 208'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '32%',
              width: '6.5%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 208'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 208', roomData['Room 208'])}
          ></div>
        )}
        {roomData['Room 205'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '38.5%',
              width: '6.5%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 205'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 205', roomData['Room 205'])}
          ></div>
        )}
        {roomData['Room 204'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '45%',
              width: '6.5%',
              height: '30%',
              backgroundColor: getHighlightColor(roomData['Room 204'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 204', roomData['Room 204'])}
          ></div>
        )}
        {roomData['Room 203'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '51.5%',
              width: '6.5%',
              height: '22.5%',
              backgroundColor: getHighlightColor(roomData['Room 203'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 203', roomData['Room 203'])}
          ></div>
        )}
        {roomData['Room 202'] && (
          <div
            className="highlight"
            style={{
              top: '13%',
              left: '58%',
              width: '8%',
              height: '30%',
              backgroundColor: getHighlightColor(roomData['Room 202'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 202', roomData['Room 202'])}
          ></div>
        )}
        {roomData['Room 201'] && (
          <div
            className="highlight"
            style={{
              top: '50%',
              left: '58%',
              width: '8%',
              height: '17%',
              backgroundColor: getHighlightColor(roomData['Room 201'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 201', roomData['Room 201'])}
          ></div>
        )}
      </div>
      <table className="room-data-table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Number of Students</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(roomData).map((room, index) => (
            <tr key={index}>
              <td>{room}</td>
              <td>{roomData[room].currentStudents}</td>
              <td>{roomData[room].capacity}</td>
              <td>{roomData[room].status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="navigation-buttons">
        <button className="previous-floor-button" onClick={goToPreviousFloor}>
          &lt; Previous Floor
        </button>
        <button className="next-floor-button" onClick={goToNextFloor}>
          Next Floor &gt;
        </button>
      </div>
    </div>
  );
};

export default BDHFloor2Page;
