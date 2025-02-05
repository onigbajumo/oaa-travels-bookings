'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-3 py-10">
    <Image src="/404.svg" width={500} height={500} alt="404" />
      <h2 className='text-center'>Oops! Something went wrong.</h2>
      <p className="mt-4 text-lg text-center w-full md:w-2/3 lg:w-1/2">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      
      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="bg-main rounded-full text-white text-center text-base px-5 py-3 font-medium"
        >
          Go home
        </Link>

      </div>
    </div>
  );
}
