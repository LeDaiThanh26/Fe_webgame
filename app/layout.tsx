import "./globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
          <div className="container mx-auto h-full w-full flex items-center justify-center p-1.25">
            {children}
          </div>
        </body>
    </html>
  );
}