
import "./globals.css";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'


export const metadata = {
  title: "Ehizuahub",
  description: "Ehizuahub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col  justify-between min-h-[100vh]'>
        <Navbar />
        <div className="pt-[100px]">

        {children}
        </div>
        
        <Footer />
        
        </body>
    </html>
  );
}
