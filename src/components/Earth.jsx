import React, { useState, useRef, useEffect } from 'react';

const Earth = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const earthRef = useRef(null);

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel events for zooming
  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.3, Math.min(3, newScale)));
  };

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.5
        }));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-2">Interactive Earth</h1>
      <p className="text-white mb-6 text-center">Drag to move • Scroll to zoom</p>
      
      <div 
        className="relative w-full max-w-4xl h-96 border-2 border-white/30 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Stars background */}
        <div className="absolute inset-0 bg-black">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>

        {/* Earth */}
        <div
          ref={earthRef}
          className="absolute w-64 h-64 rounded-full overflow-hidden transform-gpu"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease'
          }}
        >
          {/* Earth texture with continents */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full">
            {/* Continents as simple shapes */}
            <div className="absolute w-full h-full">
              {/* North America */}
              <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-green-600 rounded-lg transform -rotate-12"></div>
              {/* South America */}
              <div className="absolute top-2/3 left-1/3 w-8 h-16 bg-green-700 rounded-lg transform rotate-6"></div>
              {/* Europe */}
              <div className="absolute top-1/3 left-2/5 w-10 h-6 bg-green-500 rounded transform rotate-3"></div>
              {/* Africa */}
              <div className="absolute top-2/5 left-1/2 w-12 h-16 bg-green-600 rounded-lg"></div>
              {/* Asia */}
              <div className="absolute top-1/3 left-3/5 w-20 h-14 bg-green-500 rounded-lg transform -rotate-6"></div>
              {/* Australia */}
              <div className="absolute top-3/5 left-4/5 w-12 h-8 bg-green-600 rounded transform rotate-12"></div>
            </div>
            
            {/* Cloud cover */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/3 w-20 h-6 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-5 bg-white rounded-full"></div>
              <div className="absolute top-3/5 left-3/5 w-24 h-7 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setScale(prev => Math.min(3, prev + 0.2))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Zoom In
        </button>
        <button 
          onClick={() => setScale(prev => Math.max(0.3, prev - 0.2))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Zoom Out
        </button>
        <button 
          onClick={() => {
            setPosition({ x: 0, y: 0 });
            setScale(1);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Reset Position
        </button>
      </div>

      <div className="mt-6 text-white text-center max-w-md">
        <p className="text-sm opacity-80">
          Drag the Earth to move it around the screen. Use the scroll wheel or buttons to zoom in and out.
          The Earth automatically rotates when not being dragged.
        </p>
      </div>
    </div>
  );
};

export default Earth;