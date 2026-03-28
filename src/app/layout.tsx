import type { Metadata } from "next";
import Script from "next/script";
import { ImageOverrideProvider } from "@/components/ImageOverrideProvider";
import "./globals.css";

const siteUrl = "https://arsmusicaacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ars Musica Academy — Music Classes in Gurgaon",
    template: "%s | Ars Musica Academy",
  },
  description:
    "Ars Musica Academy offers professional music classes in Gurgaon — Guitar, Piano, Drums, Vocals, Keyboard, Ukulele & more. Trinity, Rockschool & ABRSM exam preparation. Enroll today!",
  keywords: [
    "music classes Gurgaon",
    "guitar classes Gurgaon",
    "piano classes Gurgaon",
    "drum classes Gurgaon",
    "vocal training Gurgaon",
    "keyboard classes Gurgaon",
    "ukulele classes Gurgaon",
    "music academy Gurgaon",
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
    title: "Ars Musica Academy — Music Classes in Gurgaon",
    description:
      "Professional music classes in Gurgaon — Guitar, Piano, Drums, Vocals & more. Trinity, Rockschool & ABRSM exam preparation.",
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
    title: "Ars Musica Academy — Music Classes in Gurgaon",
    description:
      "Professional music classes in Gurgaon — Guitar, Piano, Drums, Vocals & more. Trinity, Rockschool & ABRSM exam preparation.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-05XXE41TKY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-05XXE41TKY');
          `}
        </Script>
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
