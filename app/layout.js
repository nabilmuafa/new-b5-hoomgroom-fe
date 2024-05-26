import { Inter } from "next/font/google";
import AuthProvider from "./auth-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HoomGroom Furniture Store",
  description: "Developed by B5-AdvProg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
