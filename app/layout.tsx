import "./styles/globals.css"
import ClientShell from "./ui/ClientShell"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}