import "./globals.css";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    default: "OAA Travel",
    template: "%s | OAA Travel Admin",
  },
  description: `OAA Travel Apartment Bookings`,
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <ToastContainer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
