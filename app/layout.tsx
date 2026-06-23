import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Roboto} from "next/font/google";
import { Header } from "@/components/Header/Header";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: 'LearnLingo - Find Your Perfect Teacher',
    template: '%s | LearnLingo',
  },
  description: 'Connect with expert online tutors for personalized learning.',
  openGraph: {
    title: 'LearnLingo',
    description: 'Find your perfect online teacher today.',
    siteName: 'LearnLingo',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoSans.variable}`}>
      <body>
        <QueryProvider>
          <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
            <AuthProvider>
          <Header/>
            {children}
        </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
