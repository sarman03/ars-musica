import type { Metadata } from "next";
import { ImageOverrideProvider } from "@/components/ImageOverrideProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ars Musica",
  description: "Learn instruments and vocals with experienced teachers in a creative and inspiring environment.",
  icons: {
    icon: "/logo/logo.jpeg",
    apple: "/logo/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ImageOverrideProvider>{children}</ImageOverrideProvider>
      </body>
    </html>
  );
}
