import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-start h-screen pt-12'>
      <div className='animate-ping w-16 h-16 rounded-full bg-gray-500'></div>
    </div>
  );
};

export default Spinner;
