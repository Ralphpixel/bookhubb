
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import Providers from "./providers";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-raleway min-h-screen flex flex-col">
        <Providers>
          <Navbar />


          <main className="flex-1">
            {children}
          </main>

<Footer />
</Providers>
      </body>
    </html>
  );
}