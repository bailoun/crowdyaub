import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloorPage.css';

const BDHFloor1Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const mapDeviceToRooms = useCallback((data) => {
    const deviceToRoomMapping = {
      'EWA.L1A.001': 'Room 111',
      'EWA.2A1.002': 'Room 110',
      'EWA.2A1.003': 'Room 109',
      'EWA.2A1.004': 'Room 107',
      'EWA.L1A.004': 'BDH',
      'EWA.L1A.003': 'Red Room',
    };

    const capacities = {
      'Room 111': 60,
      'Room 110': 42,
      'Room 109': 48,
      'Room 107': 88,
      'BDH': 72,
      'Red Room': 17,
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
    navigate('/bdh/floor-2');
  };

  return (
    <div className="floor-plan-container">
      <h1>BDH Floor 1</h1>
      <div className="floor-plan-image-container">
        <img src="/bdh-floor-1.png" alt="BDH Floor 1" className="floor-plan-image" />
        {roomData['Room 111'] && (
          <div
            className="highlight"
            style={{
              top: '22%',
              left: '40%',
              width: '5.2%',
              height: '25%',
              backgroundColor: getHighlightColor(roomData['Room 111'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 111', roomData['Room 111'])}
          ></div>
        )}
        {roomData['Room 110'] && (
          <div
            className="highlight"
            style={{
              top: '22%',
              left: '45.45%',
              width: '5%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 110'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 110', roomData['Room 110'])}
          ></div>
        )}
        {roomData['Room 109'] && (
          <div
            className="highlight"
            style={{
              top: '22%',
              left: '50.8%',
              width: '5%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 109'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 109', roomData['Room 109'])}
          ></div>
        )}
        {roomData['Room 107'] && (
          <div
            className="highlight"
            style={{
              top: '22%',
              left: '61.3%',
              width: '6.7%',
              height: '20%',
              backgroundColor: getHighlightColor(roomData['Room 107'].currentStudents),
            }}
            data-tooltip={getTooltipText('Room 107', roomData['Room 107'])}
          ></div>
        )}
        {roomData['BDH'] && (
          <div
            className="highlight"
            style={{
              top: '42%',
              left: '70%',
              width: '6%',
              height: '49%',
              backgroundColor: getHighlightColor(roomData['BDH'].currentStudents),
              transform: 'rotate(-58deg)',
              transformOrigin: 'top left',
            }}
            data-tooltip={getTooltipText('BDH', roomData['BDH'])}
          ></div>
        )}
        {roomData['Red Room'] && (
          <div
            className="highlight"
            style={{
              top: '60%',
              left: '68%',
              width: '5%',
              height: '43%',
              backgroundColor: getHighlightColor(roomData['Red Room'].currentStudents),
              transform: 'rotate(-58deg)',
              transformOrigin: 'top left',
            }}
            data-tooltip={getTooltipText('Red Room', roomData['Red Room'])}
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
      <button className="next-floor-button" onClick={goToNextFloor}>
        Next Floor &gt;
      </button>
    </div>
  );
};

export default BDHFloor1Page;
