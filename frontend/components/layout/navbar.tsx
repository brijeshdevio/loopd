import Link from "next/link"
import { Button } from "../ui/button"

// Problems Section
// How It Works
// Who It’s For
// Features
// Pricing
// FAQ
const navbarItems = [
  {
    name: "Problems",
    href: "#problems",
  },
  {
    name: "How It Works",
    href: "#how-it-works",
  },
  {
    name: "Who It’s For",
    href: "#who-its-for",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
]

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 z-50 w-full px-2">
      <nav className="mx-auto flex max-w-xl items-center justify-between gap-x-4 rounded-full border bg-muted p-2 lg:max-w-4xl">
        <Link href="/" className="pl-2 font-semibold text-primary">
          Remindo.
        </Link>
        <div className="hidden lg:flex">
          {navbarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant={"ghost"}>{item.name}</Button>
            </Link>
          ))}
        </div>
        <div>
          <Link href="/register">
            <Button>Get Started Free</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
