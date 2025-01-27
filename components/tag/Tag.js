import React from 'react';

const Tag = ({text}) => {
  return (
    <div className='border-l-4 border-main pl-2 pr-5 rounded-tr-full rounded-br-full bg-secondary w-fit text-white font-semibold text-sm py-2'>
      {text}
    </div>
  );
}

export default Tag;
