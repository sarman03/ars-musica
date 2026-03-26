import type { Metadata } from "next";
import { ImageOverrideProvider } from "@/components/ImageOverrideProvider";
import "./globals.css";

const siteUrl = "https://arsmusicaacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ars Musica Academy — Music Classes in Faridabad",
    template: "%s | Ars Musica Academy",
  },
  description:
    "Ars Musica Academy offers professional music classes in Faridabad — Guitar, Piano, Drums, Vocals, Keyboard, Ukulele & more. Trinity, Rockschool & ABRSM exam preparation. Enroll today!",
  keywords: [
    "music classes Faridabad",
    "guitar classes Faridabad",
    "piano classes Faridabad",
    "drum classes Faridabad",
    "vocal training Faridabad",
    "keyboard classes Faridabad",
    "ukulele classes Faridabad",
    "music academy Faridabad",
    "Trinity exam preparation",
    "Rockschool exam",
    "ABRSM exam India",
    "online music classes India",
    "Ars Musica Academy",
  ],
  icons: {
    icon: "/logo/logo.jpeg",
    apple: "/logo/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Ars Musica Academy",
    title: "Ars Musica Academy — Music Classes in Faridabad",
    description:
      "Professional music classes in Faridabad — Guitar, Piano, Drums, Vocals & more. Trinity, Rockschool & ABRSM exam preparation.",
    images: [
      {
        url: "/logo/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Ars Musica Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ars Musica Academy — Music Classes in Faridabad",
    description:
      "Professional music classes in Faridabad — Guitar, Piano, Drums, Vocals & more. Trinity, Rockschool & ABRSM exam preparation.",
    images: ["/logo/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ImageOverrideProvider>{children}</ImageOverrideProvider>
      </body>
    </html>
  );
}
