import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      
      <Image src='/logo.png' width={400} height={80} />
    </div>
  );
}
