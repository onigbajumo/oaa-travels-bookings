import { Avatar } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';



const Header = () => {
  return (
    <div className='border-b border-secondary/50 w-full py-1 px-5 bg-white sticky top-0 z-10 flex justify-end'>
      <Link href="/admin/dashboard/profile" className='flex items-center gap-2 hover:bg-[#bdd7ee9d] rounded p-1'>
        <Avatar size='sm' name='Admin' /> <span className='text-sm'>Admin</span>
      </Link>
    </div>
  );
}

export default Header;
