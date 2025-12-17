"use client"

import { usePathname } from "next/navigation"
import Header from "./header"
import Footer from "./footer"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""

  // Nếu là route admin, không render header/footer
  if (pathname.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <div className="flex-grow container mx-auto h-full w-full flex items-center justify-center p-1.25">
        {children}
      </div>
      <Footer />
    </>
  )
}
