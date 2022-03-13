import React, { useState } from "react";

const Stars = () => {
  const [getCord, setCord] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);
  const showStar = (e) => {
    setStars(stars.concat([{ x: e.clientX, y: e.clientY }]));
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 select-none"
      onMouseDown={(e) => showStar(e)}
    >
      {stars &&
        stars.map((val, index) => {
          return (
            <div
              key={index}
              className="fixed w-60 h-60 z-0"
              style={{
                left: `${val.x}px`,
                top: `${val.y - 240}px`,
              }}
            >
              <div className="star duration-500 h-full bg-neutral-900 dark:bg-gray-50"></div>
            </div>
          );
        })}
    </div>
  );
};

export default Stars;
