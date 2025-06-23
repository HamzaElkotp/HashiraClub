import { Geist, Geist_Mono } from "next/font/google";
import "./Style/globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="navbar">
          <div className="navbar-end p-2">
            <ThemeSwitcher />
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
