import React from 'react';

import { VscLoading } from "react-icons/vsc"

const Loading = () => {
  return <div className='my-16'>
      <VscLoading className='text-gray-400 dark:text-neutral-500 h-6 w-6 m-auto animate-spin' />
  </div>;
};

export default Loading;
