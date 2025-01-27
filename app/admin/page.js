import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/admin/dashboard');

  return null;
};

export default Page;
