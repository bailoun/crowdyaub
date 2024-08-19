import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BDHFloor12Page.css';

const BDHFloor2Page = () => {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const mapDeviceToRooms = useCallback((data) => {
    const deviceToRoomMapping = {
      'EWA.2A.001': 'Room 212',
      'EWA.2A.002': 'Room 211',
      'EWA.2A.003': 'Room 209',
      'EWA.2A.004': 'Room 208',
      'EWA.2A.005': 'Room 205',
      'EWA.2A.006': 'Room 204',
      'EWA.2A.007': 'Room 203',
      'EWA.2A.008': 'Room 202',
      'EWA.2A.009': 'Room 201',
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
    navigate('/bdh/floor-4');
  };

  const goToPreviousFloor = () => {
    navigate('/bdh/floor-1');
  };

  return (
    <div className="floor-plan-container">
      <h1>Bechtel Floor 2</h1>
      <div className="floor-plan-image-container">
        <img src="/bdh-floor-2.png" alt="BDH Floor 2" className="floor-plan-image" />
        
        {/* Highlight for Room 212 */}
        {roomData['Room 212'] && (
          <div
            className="highlight highlight-room-212"
            data-tooltip={getTooltipText('Room 212', roomData['Room 212'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 212'].status) }}
          ></div>
        )}

        {/* Highlight for Room 211 */}
        {roomData['Room 211'] && (
          <div
            className="highlight highlight-room-211"
            data-tooltip={getTooltipText('Room 211', roomData['Room 211'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 211'].status) }}
          ></div>
        )}

        {/* Highlight for Room 209 */}
        {roomData['Room 209'] && (
          <div
            className="highlight highlight-room-209"
            data-tooltip={getTooltipText('Room 209', roomData['Room 209'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 209'].status) }}
          ></div>
        )}

        {/* Highlight for Room 208 */}
        {roomData['Room 208'] && (
          <div
            className="highlight highlight-room-208"
            data-tooltip={getTooltipText('Room 208', roomData['Room 208'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 208'].status) }}
          ></div>
        )}

        {/* Highlight for Room 205 */}
        {roomData['Room 205'] && (
          <div
            className="highlight highlight-room-205"
            data-tooltip={getTooltipText('Room 205', roomData['Room 205'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 205'].status) }}
          ></div>
        )}

        {/* Highlight for Room 204 */}
        {roomData['Room 204'] && (
          <div
            className="highlight highlight-room-204"
            data-tooltip={getTooltipText('Room 204', roomData['Room 204'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 204'].status) }}
          ></div>
        )}

        {/* Highlight for Room 203 */}
        {roomData['Room 203'] && (
          <div
            className="highlight highlight-room-203"
            data-tooltip={getTooltipText('Room 203', roomData['Room 203'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 203'].status) }}
          ></div>
        )}

        {/* Highlight for Room 202 */}
        {roomData['Room 202'] && (
          <div
            className="highlight highlight-room-202"
            data-tooltip={getTooltipText('Room 202', roomData['Room 202'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 202'].status) }}
          ></div>
        )}

        {/* Highlight for Room 201 */}
        {roomData['Room 201'] && (
          <div
            className="highlight highlight-room-201"
            data-tooltip={getTooltipText('Room 201', roomData['Room 201'])}
            style={{ backgroundColor: getHighlightColor(roomData['Room 201'].status) }}
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

      {/* Navigation buttons */}
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
