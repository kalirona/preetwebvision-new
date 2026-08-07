import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://preetwebvision.com"),
  title: "Preet Web Vision — Web Design, AI Automations & Digital Growth",
  description:
    "Preet Web Vision is a modern digital marketing agency crafting stunning websites, AI automations, web apps, SEO and ecommerce experiences that grow ambitious brands.",
  keywords: [
    "Preet Web Vision",
    "digital marketing agency",
    "website design",
    "web development",
    "AI automation",
    "web app development",
    "SEO",
    "ecommerce",
  ],
  authors: [{ name: "Preet Web Vision" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Preet Web Vision — Web Design, AI Automations & Digital Growth",
    description:
      "Stunning websites, AI automations, web apps, SEO and ecommerce experiences for ambitious brands.",
    siteName: "Preet Web Vision",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "Preet Web Vision" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preet Web Vision",
    description: "Web Design, AI Automations & Digital Growth",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
