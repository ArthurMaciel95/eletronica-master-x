import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Antonio E-commerce",
    template: "%s | Antonio E-commerce", // bom para páginas internas
  },
  description:
    "Antonio E-commerce - loja online moderna, rápida e segura, com produtos de qualidade e checkout protegido.",
  keywords: [
    "e-commerce",
    "loja virtual",
    "compras online",
    "produtos modernos",
    "loja Antonio",
    "loja online segura",
    "comprar online",
  ],
  authors: [{ name: "Antonio " }],
  openGraph: {
    title: "Antonio E-commerce",
    description: "Compre online com segurança e rapidez na Antonio E-commerce.",
    url: "https://www.eletronicamasterx.com.br/", // substitua pela sua URL real
    siteName: "Antonio E-commerce",
    images: [
      {
        url: "https://www.eletronicamasterx.com.br/seo.png", // crie uma imagem OG (1200x630px)
        width: 1200,
        height: 630,
        alt: "Antonio E-commerce - Loja online moderna",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio E-commerce",
    description: "Loja online moderna e segura.",
    images: ["https://www.eletronicamasterx.com.br/seo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.eletronicamasterx.com.br",
  },
  category: "e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
