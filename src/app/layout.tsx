// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Providers from "@/providers";

// // RECONSTRUCTED: this file was never uploaded/seen by this assistant in
// // any prior step. Rebuilt from the README's description ("uses next/font
// // to automatically optimize and load Geist") and the standard
// // create-next-app shape this project was bootstrapped from. If a real
// // app/layout.tsx already exists in the repository, diff against it
// // rather than overwriting blindly — in particular check for any existing
// // <head> content, analytics, or providers this reconstruction doesn't
// // know about.
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: {
//     default: "University Management System",
//     template: "%s | University Management System",
//   },
//   description:
//     "University Management System — manage students, instructors, courses, programs and academic administration.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

// Apnar file path anusare import korun
// import Providers from '@/providers';
// import { GoogleOAuthProvider } from '@react-oauth/google'; // Puronoti o shathe thakbe

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//           <Providers>
//             {children}
//           </Providers>
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: {
    default: "University Management System",
    template: "%s | University Management System",
  },
  description:
    "University Management System — manage students, instructors, courses, programs and academic administration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
        >
          <Providers>{children}</Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}