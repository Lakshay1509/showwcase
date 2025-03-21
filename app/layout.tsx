
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { QueryProviders } from "@/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
    <html lang="en">
      <body
        
      >
        <QueryProviders>
        {/* <Navbar /> */}
        {children}
        </QueryProviders>
      </body>
    </html>
    </ClerkProvider>
     
  );
}
