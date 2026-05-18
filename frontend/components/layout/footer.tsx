export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="rounded-t-[2.5rem] bg-primary">
      {/* The inner container holds the bg-primary and top rounded corners.
        Using max-w-7xl for a wider, standard SaaS footer spread.
      */}
      <div className="mx-auto max-w-7xl px-6 py-12 text-primary-foreground md:rounded-t-[3rem] md:px-12 lg:py-16">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Brand & Contact (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Remindo.</h2>
            <p className="mt-4 max-w-xs text-base text-primary-foreground/80">
              Stay organized. Keep customers coming back.
            </p>
            <div className="mt-6">
              <a
                href="mailto:hello@remindo.in"
                className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-white hover:underline hover:underline-offset-4"
              >
                Email: hello@remindo.in
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-primary-foreground/50 uppercase">
              Product
            </h3>
            <ul className="flex flex-col gap-3">
              {["Features", "Pricing", "How it works", "Updates"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-primary-foreground/50 uppercase">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {["Help Center", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-primary-foreground/50 uppercase">
              Legal
            </h3>
            <ul className="flex flex-col gap-3">
              {["Privacy Policy", "Terms", "Refund Policy"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row: Divider and Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-primary-foreground/70">
            &copy; {currentYear} Remindo. Built for growing businesses.
          </p>
        </div>
      </div>
    </footer>
  )
}
