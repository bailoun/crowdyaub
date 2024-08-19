import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloor12Page.css';

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
    if (currentStudents <= 0.25 * capacity) return 'Almost-empty';
    if (currentStudents < 0.75 * capacity) return 'Half-capacity';
    return 'Full-capacity';
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
      case 'Almost-empty':
        return 'rgba(0, 255, 0, 0.5)'; // Green
      case 'Half-capacity':
        return 'rgba(255, 255, 0, 0.5)'; // Yellow
      case 'Full-capacity':
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
      <h1>Bechtel Floor 1</h1>
      <div className="floor-plan-image-container">
        <img src="/bdh-floor-1.png" alt="BDH Floor 1" className="floor-plan-image" />
        
        {/* Highlight for Room 111 */}
        {roomData['Room 111'] && (
          <div
            className="highlight highlight-room-111"
            data-tooltip={getTooltipText('Room 111', roomData['Room 111'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 111'].status) }}
          ></div>
        )}

        {/* Highlight for Room 110 */}
        {roomData['Room 110'] && (
          <div
            className="highlight highlight-room-110"
            data-tooltip={getTooltipText('Room 110', roomData['Room 110'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 110'].status) }}
          ></div>
        )}

        {/* Highlight for Room 109 */}
        {roomData['Room 109'] && (
          <div
            className="highlight highlight-room-109"
            data-tooltip={getTooltipText('Room 109', roomData['Room 109'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 109'].status) }}
          ></div>
        )}

        {/* Highlight for Room 107 */}
        {roomData['Room 107'] && (
          <div
            className="highlight highlight-room-107"
            data-tooltip={getTooltipText('Room 107', roomData['Room 107'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 107'].status) }}
          ></div>
        )}

        {/* Highlight for BDH */}
        {roomData['BDH'] && (
          <div
            className="highlight highlight-room-bdh"
            data-tooltip={getTooltipText('BDH', roomData['BDH'])}
            style={{ backgroundColor: getHighlightColor(roomData['BDH'].status) }}
          ></div>
        )}

        {/* Highlight for Red Room */}
        {roomData['Red Room'] && (
          <div
            className="highlight highlight-room-red-room"
            data-tooltip={getTooltipText('Red Room', roomData['Red Room'])}
            style={{ backgroundColor: getHighlightColor(roomData['Red Room'].status) }}
          ></div>
        )}
      </div>

      {/* Table displaying the data */}
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
              <td>{roomData[room].status.replace("-", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation button */}
      <div className="navigation-buttons">
        <button className="next-floor-button" onClick={goToNextFloor}>
          Next Floor &gt;
        </button>
      </div>
    </div>
  );
};

export default BDHFloor1Page;
