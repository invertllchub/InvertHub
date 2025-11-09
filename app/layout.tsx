import './(main)/globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// React Query Provider
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invert-Hub",
  icons: {
    icon: "https://res.cloudinary.com/dyfregti9/image/upload/v1759145889/Invert-logo_infecq.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
          toastClassName='w-[200px] h-[150px] rounded-lg shadow-md'
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
