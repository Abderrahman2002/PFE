import React, { useEffect, useState } from 'react';
import { Truck, Package, Warehouse } from 'lucide-react';

const LoadingScreen = () => {
  const [truckPosition, setTruckPosition] = useState(0);
  const [package1Position, setPackage1Position] = useState(0);
  const [package2Position, setPackage2Position] = useState(0);
  const [package3Position, setPackage3Position] = useState(0);

  useEffect(() => {
    const animationDuration = 3000; // 3 seconds for full animation
    
    const animateTruck = () => {
      const startTime = Date.now();
      
      const updatePosition = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % animationDuration) / animationDuration;
        
        // Truck movement: 0 to 200px and back
        const truckX = progress <= 0.5 
          ? progress * 2 * 200 
          : (1 - progress) * 2 * 200;
        setTruckPosition(truckX);
        
        // Package movements with delays
        const package1Progress = ((elapsed - 300) % animationDuration) / animationDuration;
        const package1X = package1Progress <= 0.5 
          ? package1Progress * 2 * 200 
          : (1 - package1Progress) * 2 * 200;
        setPackage1Position(package1Progress < 0 ? 0 : package1X);
        
        const package2Progress = ((elapsed - 600) % animationDuration) / animationDuration;
        const package2X = package2Progress <= 0.5 
          ? package2Progress * 2 * 200 
          : (1 - package2Progress) * 2 * 200;
        setPackage2Position(package2Progress < 0 ? 0 : package2X);
        
        const package3Progress = ((elapsed - 900) % animationDuration) / animationDuration;
        const package3X = package3Progress <= 0.5 
          ? package3Progress * 2 * 200 
          : (1 - package3Progress) * 2 * 200;
        setPackage3Position(package3Progress < 0 ? 0 : package3X);
        
        requestAnimationFrame(updatePosition);
      };
      
      requestAnimationFrame(updatePosition);
    };
    
    animateTruck();
    
    // Cleanup function
    return () => {};
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        {/* Main loading animation container */}
        <div className="w-64 h-24 relative">
          {/* Animated path */}
          <div className="absolute top-12 w-full h-1 bg-white rounded-full opacity-70"></div>
          
          {/* Warehouse on the left */}
          <div className="absolute left-0 top-2">
            <Warehouse size={24} className="text-white" />
          </div>
          
          {/* Warehouse on the right */}
          <div className="absolute right-0 top-2">
            <Warehouse size={24} className="text-white" />
          </div>
          
          {/* Animated truck moving from left to right */}
          <div className="absolute" style={{ transform: `translateX(${truckPosition}px) translateY(-4px)` }}>
            <Truck size={32} className="text-white" />
          </div>
          
          {/* Animated packages */}
          <div className="absolute" style={{ transform: `translateX(${package1Position}px) translateY(0px)` }}>
            <Package size={20} className="text-white" />
          </div>
          
          <div className="absolute" style={{ transform: `translateX(${package2Position}px) translateY(0px)` }}>
            <Package size={20} className="text-white" />
          </div>
          
          <div className="absolute" style={{ transform: `translateX(${package3Position}px) translateY(0px)` }}>
            <Package size={20} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white" 
            style={{ animation: 'pulse 2s infinite' }}>
          Loading Stock System...
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;