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
  title: {
    default: "Preet Web Vision — Web Design, AI Automations & Digital Growth",
    template: "%s — Preet Web Vision",
  },
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
    "digital agency India",
    "web design company",
    "AI chatbot development",
    "Shopify development",
    "Next.js agency",
    "AI automation agency",
    "website design Philippines",
    "ecommerce development",
    "SEO services",
    "digital growth agency",
    "custom web applications",
    "headless commerce",
    "LLM chatbot",
    "AI agent development",
    "RAG implementation",
  ],
  authors: [{ name: "Preet Web Vision" }],
  creator: "Preet Web Vision",
  publisher: "Preet Web Vision",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Preet Web Vision — Web Design, AI Automations & Digital Growth",
    description:
      "Stunning websites, AI automations, web apps, SEO and ecommerce experiences for ambitious brands.",
    siteName: "Preet Web Vision",
    type: "website",
    locale: "en_US",
    url: "https://preetwebvision.com",
    images: [{ url: "https://preetwebvision.com/og-image.png", width: 1344, height: 768, alt: "Preet Web Vision — Digital Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preet Web Vision",
    description: "Web Design, AI Automations & Digital Growth",
    images: ["https://preetwebvision.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://preetwebvision.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff2d75" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Organization + WebSite schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Preet Web Vision",
                url: "https://preetwebvision.com",
                logo: "https://preetwebvision.com/logo.svg",
                description: "A modern digital marketing agency crafting stunning websites, AI automations, web apps, SEO and ecommerce experiences.",
                email: "hello@preetwebvision.com",
                telephone: "+639633112000",
                sameAs: [
                  "https://youtube.com/@preet_tech_ideas",
                ],
                areaServed: "Worldwide",
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Preet Web Vision",
                url: "https://preetwebvision.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://preetwebvision.com/#blog?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
          {/* FAQPage schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What services does Preet Web Vision offer?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We offer Website Design & Development, AI Automations, Web App Development, SEO & Digital Growth, and Ecommerce Solutions. We combine design, engineering, and AI to help ambitious brands grow online.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much does a website cost?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We offer custom quotes based on project scope. Contact us for a free consultation and personalized quote. No fixed pricing tiers — every project is unique.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How long does a project take?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Marketing sites ship in 2-4 weeks, web apps and ecommerce in 6-10 weeks, and AI automations in 2-6 weeks depending on complexity. We share a detailed timeline after a discovery call.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can you build AI chatbots for my business?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes! We design, train, and deploy LLM agents grounded in your data (RAG), connected to your tools, with guardrails and analytics. Most clients see 60-80% of support tickets auto-resolved.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do you work with startups and enterprises?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, we adapt our process to your stage — from MVPs for funded startups to large-scale platforms and retainers for enterprises. We serve clients worldwide, remote-first.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What tech stack do you use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Next.js, TypeScript, Tailwind CSS, Prisma, Node.js, OpenAI-grade LLMs, Shopify, and headless commerce. We use modern, battle-tested technologies for fast, scalable, and maintainable solutions.",
                    },
                  },
                ],
              }),
            }}
          />
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
