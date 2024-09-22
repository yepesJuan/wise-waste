import Header from "@/components/Header";
import "./globals.css";

import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="../../public/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
      </head>
      <body>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
