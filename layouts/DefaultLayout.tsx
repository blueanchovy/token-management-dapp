import Header from "@/components/Header";
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
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {children}
      </main>
    </>
  );
}
