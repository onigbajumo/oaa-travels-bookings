import "./globals.css";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    default: "MBGMOD - Most Beautiful Girl Mushin Odi-Olowo",
    template: "%s | MBGMOD Admin",
  },
  description: `Most Beautiful Girl Mushin Odi-Olowo`,
  
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
