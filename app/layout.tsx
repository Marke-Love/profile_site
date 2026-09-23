import type { Metadata } from "next";
import { Unbounded, Golos_Text, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { SiteChrome } from "@/components/ui/SiteChrome";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

/** Set NEXT_PUBLIC_SITE_URL once the site has its real address. */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marke-love.github.io/profile_site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Александр Маркелов — Python Backend Developer",
  description:
    "Middle Python backend developer, 4+ года опыта: FastAPI, RabbitMQ, PostgreSQL, Redis, Docker. Снизил задержку API с 800 мс до 450 мс, автоматизировал 200+ документов в месяц.",
  keywords: [
    "Python", "Backend", "FastAPI", "RabbitMQ", "PostgreSQL", "Redis",
    "Docker", "разработчик", "Санкт-Петербург",
  ],
  authors: [{ name: "Александр Маркелов", url: "https://github.com/Marke-Love" }],
  openGraph: {
    type: "profile",
    locale: "ru_RU",
    title: "Александр Маркелов — Python Backend Developer",
    description:
      "4+ года коммерческого опыта. FastAPI, RabbitMQ, PostgreSQL, Redis. Задержка API 800 мс → 450 мс, 2000 фоновых задач в сутки.",
    siteName: "Александр Маркелов",
  },
  twitter: {
    card: "summary_large_image",
    title: "Александр Маркелов — Python Backend Developer",
    description: "FastAPI, RabbitMQ, PostgreSQL, Redis. Задержка API 800 мс → 450 мс.",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Александр Маркелов",
  jobTitle: "Python Backend Developer",
  email: "mailto:mrklv001@yandex.ru",
  telephone: "+7 921 650-49-35",
  address: { "@type": "PostalAddress", addressLocality: "Санкт-Петербург", addressCountry: "RU" },
  url: SITE,
  sameAs: ["https://github.com/Marke-Love", "https://t.me/Mrklv001"],
  knowsLanguage: ["ru", "en"],
  knowsAbout: ["Python", "FastAPI", "RabbitMQ", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Университет ИТМО" },
    { "@type": "CollegeOrUniversity", name: "СПбГЭУ" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${golos.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="grain min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <SiteChrome />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
