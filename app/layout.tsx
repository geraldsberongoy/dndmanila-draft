import type React from "react"
import type { Metadata } from "next"
import { Fjalla_One, Nunito_Sans } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla-one",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dndmnl.com'), // Update this with your actual domain
  title: {
    default: "DND MNL — Secure Your Step | Exclusive Sneaker Vault",
    template: "%s | DND MNL"
  },
  description: "Manila's premier destination for exclusive drops, limited sneakers, and high-end streetwear. No restocks. Secure your pair before they're gone.",
  keywords: ["sneakers", "streetwear", "manila", "authentic", "exclusive drops", "nike", "jordan", "yeezy", "vault", "limited edition"],
  authors: [{ name: "DND MNL" }],
  creator: "DND MNL",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://dndmnl.com",
    title: "DND MNL — Secure Your Step",
    description: "Limited drops. No restocks. Manila's exclusive sneaker vault.",
    siteName: "DND MNL",
    images: [
      {
        url: "/nike-air-jordan-1-travis-scott-sneaker-product-sho.jpg",
        width: 1200,
        height: 630,
        alt: "DND MNL Exclusive Drops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DND MNL — Secure Your Step",
    description: "Manila's premier destination for limited sneakers and streetwear.",
    images: ["/nike-air-jordan-1-travis-scott-sneaker-product-sho.jpg"],
    creator: "@dndmnl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${fjallaOne.variable} ${nunitoSans.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
