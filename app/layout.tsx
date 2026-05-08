import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const previewImage = "/assets/share-preview-20260506.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://project-kxc4g.vercel.app"),
  title: "PDP Room Finder",
  description: "Find available PDP rooms by current time, day, and lesson schedule.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icons/apple-touch-icon.png"
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "PDP Room Finder",
    title: "PDP Room Finder",
    description: "Find available PDP rooms by current time, day, and lesson schedule.",
    url: "/",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "PDP Room Finder realtime campus room availability dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDP Room Finder",
    description: "Find available PDP rooms by current time, day, and lesson schedule.",
    images: [
      {
        url: previewImage,
        alt: "PDP Room Finder realtime campus room availability dashboard"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#050606"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Script src="https://telegram.org/js/telegram-web-app.js?62" strategy="beforeInteractive" />
      <body>{children}</body>
    </html>
  );
}
