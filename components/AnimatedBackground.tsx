import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-float-1"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-25 animate-float-2"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-float-3"></div>
      <div className="absolute top-1/3 right-10 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 animate-float-1"></div>
      <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-18 animate-float-2"></div>
      <div className="absolute top-2/3 left-20 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-22 animate-float-3"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-16 right-1/4 w-16 h-16 bg-gradient-to-r from-violet-400 to-fuchsia-500 rotate-45 opacity-25 animate-spin-slow"></div>
      <div className="absolute bottom-40 left-16 w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rotate-12 opacity-20 animate-bounce-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg opacity-18 animate-pulse-slow"></div>
    </div>
  );
};

export default AnimatedBackground;