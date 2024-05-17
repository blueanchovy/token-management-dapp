import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex ">
        <Navbar />
        <main className={`p-24 ${inter.className}`}>{children}</main>
      </div>

      <Footer />
    </>
  );
}
