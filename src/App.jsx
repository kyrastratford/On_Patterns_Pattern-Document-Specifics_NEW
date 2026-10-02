import React, { useState } from "react";
import "./styles.css";

const PATTERN_IMAGE_URL =
  "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/pattern-blueprint.png";

const HOTSPOTS = [
  {
    id: 1,
    title: "Last Draft",
    x: 69,
    y: 55,
    zoomScale: 2.8,
    // 🎯 ADD AN IMAGE URL HERE IF DESIRED (LEAVE AS "" OR OMIT IF NO IMAGE IS NEEDED)
    imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/last-draft-line.png",
    description:
      "For all future pattern documents the last draft of the upper needs to be visible, this means a purple line as seen on the figure 3 and figure 3.1 below. The last draft needs to be place correctly according to Last Draft Creation(2025) document.",
  },
  {
    id: 2,
    title: "Last Bottom Pattern",
    x: 82,
    y: 35,
    zoomScale: 2.3,
    imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/last-draft.png",
    description:
      "Together with the stroble pattern the last bottom pattern needs to be visible and correctly placed as shown in Figure 4.1. The outline and the guidelines of the last bottom pattern need to be coloured in a purple (colour code: 8200ff) line. This is the same colour as the last draft.",
  },
  {
    id: 3,
    title: "Bite Line",
    x: 35,
    y: 68,
    zoomScale: 2.6,
    imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/bite-line.png",
    description:
      "For all future pattern documents the bite line of the tooling needs to be visible, this is show as a yellow (colour code: ff9900) as seen below.",
  },
  {
    id: 4,
    title: "Shell and Shoe Measurements",
    x: 52,
    y: 85,
    zoomScale: 2.2,
    imageUrl: "",
    description:
      "Next to the revision notes we created a table to fill in the most important measurements of the shell pattern and shoe. These measurements are important because it allows us to know what is happening during the manufacturing process. This needs to be done for every new revision.",
  },
];

export default function App() {
  const [activeSpotId, setActiveSpotId] = useState(null);

  const activeSpot = HOTSPOTS.find((s) => s.id === activeSpotId);

  const handleSpotClick = (id) => {
    setActiveSpotId((prev) => (prev === id ? null : id));
  };

  // 🎯 DYNAMIC TRANSFORM ORIGIN CENTERS THE ZOOM DIRECTLY ON THE PIN'S X/Y COORDINATES
  const transformStyle = activeSpot
    ? {
        transformOrigin: `${activeSpot.x}% ${activeSpot.y}%`,
        transform: `scale(${activeSpot.zoomScale || 2.5})`,
      }
    : {
        transformOrigin: "center center",
        transform: "scale(1)",
      };

  return (
    <div className="app-container">
      <main className="viewport-matrix">
        <div className="stage-wrapper">
          <div className="zoom-layer" style={transformStyle}>
            <img
              src={PATTERN_IMAGE_URL}
              alt="Pattern Terminologies Shell"
              className="pattern-image"
            />

            {HOTSPOTS.map((spot) => {
              const isActive = activeSpotId === spot.id;
              return (
                <button
                  key={spot.id}
                  className={`hotspot-pin ${isActive ? "active" : ""}`}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  onClick={() => handleSpotClick(spot.id)}
                  title={spot.title}
                >
                  <span className="pin-pulse" />
                  <span className="pin-core">{spot.id}</span>
                  <span className="pin-tooltip">{spot.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎯 INFO CARD WITH OPTIONAL IMAGE SUPPORT */}
        {activeSpot && (
          <aside className="glazed-glass-card animate-slide-up">
            <div className="card-header">
              <h2>{activeSpot.title}</h2>
              <button
                className="close-btn"
                onClick={() => setActiveSpotId(null)}
              >
                ×
              </button>
            </div>

            {/* Render Image if imageUrl exists */}
            {activeSpot.imageUrl && (
              <div className="card-image-container">
                <img
                  src={activeSpot.imageUrl}
                  alt={activeSpot.title}
                  className="card-info-image"
                />
              </div>
            )}

            <p className="card-desc">{activeSpot.description}</p>
          </aside>
        )}

        {!activeSpot && (
          <div className="bottom-hud-container">
            <div className="glass-callout">
              <span>👆 Click any target pin to zoom into pattern details</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}