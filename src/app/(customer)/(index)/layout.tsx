import "../../customer-globals.css";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Toserba",
  description: "Toko serba ada",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
