
import "./globals.css";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: "Ehizuahub",
  description: "Ehizuahub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <Navbar />
        <div>

        {children}
        </div>
        
        <Footer />
        
        </body>
    </html>
  );
}
