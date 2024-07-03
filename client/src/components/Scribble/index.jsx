import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Scribble = forwardRef((props, ref) => {
  const [paths, setPaths] = useState([]);

  useImperativeHandle(ref, () => ({
    addScribble: () => {
      const penElement = document.querySelector('.pen');
      if (penElement) {
        const rect = penElement.getBoundingClientRect();
        const newPath = generateRandomPath(rect.left + rect.width / 2, rect.top + rect.height / 2);
        setPaths(prevPaths => [...prevPaths, newPath]);
      }
    }
  }));

  const generateRandomPath = (startX, startY) => {
    const endX = startX + (Math.random() - 0.5) * 20;
    const endY = startY + (Math.random() - 0.5) * 20;
    const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 20;
    const controlY = (startY + endY) / 2 + (Math.random() - 0.5) * 20;
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  return (
    <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
      {paths.map((path, index) => (
        <path key={index} d={path} fill="none" stroke="black" strokeWidth="2" />
      ))}
    </svg>
  );
});

export default Scribble;