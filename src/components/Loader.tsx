// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default Loader;
