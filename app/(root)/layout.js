import "./globals.css";
import Navbar from "@/components/sharedComponents/Navbar";


export const metadata = {
  title: "ConnectLy",
  description: "Centralized Storage to manage your links",
};

export default function RootLayout({ children }) {
  return (
    <div lang="en">
     
        <Navbar/>
        {children}
      
    </div>
  );
}
