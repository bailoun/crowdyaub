import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloor45Page.css';

const BDHFloor5Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const mapDeviceToRooms = useCallback((data) => {
    const deviceToRoomMapping = {
      'EWA.F05.010': 'Conference Room 537',
      'EWA.F05.03': 'Conference Room 536',
    };

    const capacities = {
      'Conference Room 537': 17,
      'Conference Room 536': 14,
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

  const getTooltipText = (room, data) => {
    if (!data) return `${room}: No data`;
    return `${room}: ${data.currentStudents} students`;
  };

  const goToPreviousFloor = () => {
    navigate('/bdh/floor-4');
  };

  return (
    <div className="floor-plan-container">
      <h1>Bechtel Floor 5</h1>
      <div className="floor-plan-image-container">
        <img src="/bdh-floor-5.png" alt="BDH Floor 5" className="floor-plan-image" />

        {roomData['Conference Room 537'] && (
          <div
            className={`highlight highlight-room-537 ${roomData['Conference Room 537'].status}`}
            data-tooltip={getTooltipText('Conference Room 537', roomData['Conference Room 537'])}
          ></div>
        )}

        {roomData['Conference Room 536'] && (
          <div
            className={`highlight highlight-room-536 ${roomData['Conference Room 536'].status}`}
            data-tooltip={getTooltipText('Conference Room 536', roomData['Conference Room 536'])}
          ></div>
        )}
      </div>

      {/* Adding a table under the floor plan */}
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

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button className="previous-floor-button" onClick={goToPreviousFloor}>
          &lt; Previous Floor
        </button>
      </div>
    </div>
  );
};

export default BDHFloor5Page;
