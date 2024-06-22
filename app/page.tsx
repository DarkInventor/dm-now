import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import LoginPage from "./(auth)/login/page"

export default function IndexPage() {
  return (
    <section className="mx-auto min-h-screen w-full max-w-[500px]">
      <LoginPage />
    </section>
  )
}
