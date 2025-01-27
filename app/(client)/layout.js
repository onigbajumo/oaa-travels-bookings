import "./globals.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    default: "Ehizuahub - We Provide IT Solutions That Beat Your Imagination",
    template: "%s | Ehizuahub",
  },
  description: `We design and build cutting-edge software solutions and deliver excellent IT solutions that beat your imaginations.`,
  openGraph: {
    title: "Ehizuahub - We Provide IT Solutions That Beat Your Imagination",
    description: `We design and build cutting-edge software solutions and deliver excellent IT solutions that beat your imaginations.`,
    url: "https://www.ehizuahub.com/",
    siteName: "Ehizuahub - We Provide IT Solutions That Beat Your Imagination",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.ehizuahub.com/og.png",
        width: 1200,
        height: 630,
        alt: "Ehizuahub",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <ToastContainer />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
