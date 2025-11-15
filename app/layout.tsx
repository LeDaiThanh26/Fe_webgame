import "./styles/globals.css"
import Footer from "./ui/footer"
import Header from "./ui/header"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
          <Header/>
          <div className="flex-grow container mx-auto h-full w-full flex items-center justify-center p-1.25">
            {children}
          </div>
          <Footer />
        </body>
    </html>
  );
}