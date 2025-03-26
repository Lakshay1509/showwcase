
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { QueryProviders } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster richColors theme="dark" />
        <Navbar />
        {children}
        </QueryProviders>
      </body>
    </html>
    </ClerkProvider>
     
  );
}
