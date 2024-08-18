import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeatmapPage.css';

const HeatmapPage = () => {
  const [buildingStatus, setBuildingStatus] = useState('Almost Empty'); // Default status
  const [highlightColor, setHighlightColor] = useState('rgba(0, 255, 0, 0.5)'); // Default color
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://3oiryog5g8.execute-api.eu-central-1.amazonaws.com/Prod/devices')
      .then((response) => response.json())
      .then((data) => {
        const totalCapacity = 474; // Replace this with the sum of your room capacities
        let totalStudents = 0;

        Object.keys(data).forEach((device) => {
          totalStudents += parseInt(data[device].UserCount, 10);
        });

        const ratio = totalStudents / totalCapacity;

        if (ratio <= 0.25) {
          setBuildingStatus('Almost Empty');
          setHighlightColor('rgba(0, 255, 0, 0.5)'); // Green
        } else if (ratio >= 0.75) {
          setBuildingStatus('Full Capacity');
          setHighlightColor('rgba(255, 0, 0, 0.5)'); // Red
        } else {
          setBuildingStatus('Half Capacity');
          setHighlightColor('rgba(255, 255, 0, 0.5)'); // Yellow
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleHighlightClick = () => {
    navigate('/bdh'); // Navigate to the BDH page
  };

  return (
    <main>
      <section className="heatmap fade-in">
        <div className="container">
          <h2>Heatmap</h2>
          <div className="heatmap-container">
            <img 
              src="/heatmap.png" 
              alt="Campus Heatmap" 
              className="heatmap-image" 
              useMap="#campusmap" 
            />

            <div 
              className="highlighted-area"
              style={{ backgroundColor: highlightColor }}
              data-tooltip={buildingStatus}
              onClick={handleHighlightClick} // Handle the click event
            ></div>

            <map name="campusmap">
              <area 
                shape="rect" 
                coords="550,300,640,325" 
                alt="Bechtel Engineering Building" 
                href="/bdh" 
              />
            </map>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeatmapPage;
