import "./styles/globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export const metadata = {
  title: "GameZone – Chơi game online miễn phí",
  description: "Nơi chơi game trực tuyến hay nhất Việt Nam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}