import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; 
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ConnectLy",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
              appearance={{
                baseTheme: [,dark,neobrutalism],
                signUp: {
                  baseTheme: [shadesOfPurple],
                  variables: { colorPrimary: 'green' },
                },
                signIp: {
                  baseTheme: [dark],
                  variables: { colorPrimary: 'green' },
                },
              }}
        >
        {children}
        </ClerkProvider>

      </body>
    </html>
  );
}
