import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import PageViewTracker from "@/components/PageViewTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mứt 3 Miền - Di Sản Hương Vị Việt",
  description: "Khám phá hương vị mứt truyền thống từ ba miền Bắc - Trung - Nam, kết hợp câu chuyện văn hóa vùng miền trong từng sản phẩm.",
  keywords: ["mứt", "trái cây", "Việt Nam", "di sản", "văn hóa", "truyền thống"],
  openGraph: {
    title: "Mứt 3 Miền - Di Sản Hương Vị Việt",
    description: "Khám phá hương vị mứt truyền thống từ ba miền Bắc - Trung - Nam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <PageViewTracker />
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

