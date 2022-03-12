import React from 'react';
import { WiWindy } from "react-icons/wi"

const NF404 = () => {
  return <div className='h-4/6 flex space-x-2 md:space-x-6 text-center items-center justify-center text-lg md:text-2xl text-gray-700 dark:text-gray-400'>
      <WiWindy className='h-12 w-12 animate-pulse' />
      <p className='font-Yomogi'>Owf, Page doesn't exist</p>
      <WiWindy className='h-12 w-12 animate-pulse' />
  </div>;
};

export default NF404;
