"use client"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BriefcaseIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  CloudIcon,
  EnvelopeOpenIcon,
  FactoryIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  ScissorsIcon,
  StethoscopeIcon,
  TShirtIcon,
  UsersIcon,
  WrenchIcon,
  XCircleIcon,
} from "@phosphor-icons/react"

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background px-4 py-24 text-center sm:px-6 sm:py-16 lg:px-8">
      {/* Top Badge */}
      <div className="mb-8 flex justify-center">
        <Badge className="rounded-full px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.2em] text-secondary-foreground uppercase">
          Lightweight • Customer Reminders
        </Badge>
      </div>

      {/* Main Headline */}
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Turn one-time customers into <br className="hidden sm:block" /> repeat
          customers.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
          Calls, visits, reminders, and notes — all in one calm workspace for
          growing businesses.
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
        <Button
          size="lg"
          className="h-12 w-full rounded-full px-8 text-base font-semibold sm:w-auto"
        >
          Start Free Today
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full rounded-full px-8 text-base font-semibold sm:w-auto"
        >
          See How It Works
        </Button>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Add Customer",
      description: "Save customer name, number, and notes in seconds.",
    },
    {
      number: "2",
      title: "Set Reminders",
      description: "Schedule a call, visit, payment reminder, or callback.",
    },
    {
      number: "3",
      title: "Stay Notified",
      description:
        "Receive email, whatsapp and reminders before anything gets missed.",
    },
  ]

  return (
    <section className="bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Get up and running in less than 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-muted/60 p-8 pt-10 sm:p-10"
            >
              {/* Overlapping Number Badge */}
              <div className="absolute -top-5 -left-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-sm sm:-top-5 sm:-left-5">
                {step.number}
              </div>

              {/* Card Content */}
              <h3 className="mb-4 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    {
      title: "Forgot to call customer back",
      description:
        "A customer asked for a callback, but it slipped through the cracks.",
    },
    {
      title: "No system for repeat customers",
      description: "Everything lives in WhatsApp chats or memory.",
    },
    {
      title: "Missed service dates",
      description: "Customers forget you — because you forgot them first.",
    },
    {
      title: "Sticky notes & notebooks",
      description: "Scattered customer notes make follow-ups impossible.",
    },
  ]

  return (
    <section className="bg-secondary/20 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Stop losing customers because <br className="hidden md:block" /> of
            missed reminders.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:mt-6 sm:text-xl">
            Small businesses lose repeat customers for simple reasons.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              {/* Red 'X' Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <XCircleIcon className="h-6 w-6" weight="fill" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition / Mini CTA Box */}
        <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-primary/10 bg-primary/5 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Remindo fixes this with one simple system.
          </h3>
          <Button
            size="lg"
            className="mt-8 h-12 rounded-full px-8 text-base font-semibold shadow-md sm:h-14 sm:px-10 sm:text-lg"
          >
            Try Free for 7 Days
          </Button>
        </div>
      </div>
    </section>
  )
}

function WhoItsForSection() {
  const businesses = [
    {
      name: "Clothing Shops",
      icon: TShirtIcon,
    },
    {
      name: "Electronics Repair",
      icon: WrenchIcon,
    },
    {
      name: "Salons",
      icon: ScissorsIcon,
    },
    {
      name: "Clinics",
      icon: StethoscopeIcon,
    },
    {
      name: "Service Businesses",
      icon: BriefcaseIcon,
    },
    {
      name: "Machinery Dealers",
      icon: FactoryIcon,
    },
  ]

  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-sm font-bold tracking-wider text-primary uppercase">
            Who It&apos;s For
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Perfect for businesses like yours.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you are booking follow-ups or reminding customers about
            pickups, Remindo is built to fit your workflow.
          </p>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8">
          {businesses.map((business) => (
            <div
              key={business.name}
              className="group flex cursor-default flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-primary/5 sm:p-8"
            >
              {/* Icon Container with Hover Effect */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:h-16 sm:w-16">
                <business.icon
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  weight="regular"
                />
              </div>

              <h3 className="text-sm font-semibold text-foreground sm:text-base">
                {business.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: "Daily Schedule",
      description: "See who to call, meet, or remind today — all in one place.",
      icon: CalendarCheckIcon,
    },
    {
      title: "Customer Notes",
      description:
        "Save measurements, preferences, issues, or past conversations.",
      icon: PencilSimpleIcon,
    },
    {
      title: "Email/Whatsapp Alerts",
      description: "Get notified before important customer tasks are due.",
      icon: EnvelopeOpenIcon,
    },
    {
      title: "Team Sharing",
      description: "Keep your staff updated with shared customer history.",
      icon: UsersIcon,
    },
    {
      title: "Quick Search",
      description: "Find any customer instantly by name or phone number.",
      icon: MagnifyingGlassIcon,
    },
    {
      title: "Auto Backup",
      description: "Never lose customer data accidentally.",
      icon: CloudIcon,
    },
  ]

  return (
    <section className="bg-secondary/30 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Features
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            How does this help me?
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[2rem] bg-card p-8 shadow-sm transition-shadow hover:shadow-md sm:p-10"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                />
              </div>

              {/* Card Content */}
              <h3 className="mb-3 text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: "Free Trial",
      tag: "7 DAYS FREE",
      price: "0",
      description: "Test all features",
      features: ["50 Customer Records", "20 Reminders", "Email Alerts"],
      buttonText: "Start Free",
      isPopular: false,
    },
    {
      name: "Standard",
      tag: "MOST POPULAR",
      price: "299",
      period: "/mo",
      description: "For growing shops",
      features: [
        "Unlimited Customers",
        "500 Reminders / month",
        "WhatsApp Integration",
        "Daily Morning Agenda",
      ],
      buttonText: "Get Started",
      isPopular: true,
    },
    {
      name: "Pro",
      price: "699",
      period: "/mo",
      description: "For multi-staff teams",
      features: [
        "Everything in Standard",
        "Up to 5 Team Members",
        "Shared Team Workspace",
        "Priority Support",
      ],
      buttonText: "Go Pro",
      isPopular: false,
    },
  ]

  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Start free. Upgrade only when your business grows.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md sm:p-10 ${
                plan.isPopular
                  ? "border-2 border-primary shadow-lg"
                  : "border border-border"
              }`}
            >
              {/* Highlight Badge for Popular Plan */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary">
                    {plan.tag}
                  </Badge>
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                {!plan.isPopular && plan.tag && (
                  <Badge
                    variant="secondary"
                    className="mb-4 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {plan.tag}
                  </Badge>
                )}
                <h3
                  className={`text-xl font-bold ${!plan.tag && !plan.isPopular ? "mt-8" : ""}`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold text-foreground">
                  ₹{plan.price}
                  {plan.period && (
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="mb-8 flex flex-1 flex-col gap-4">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircleIcon
                      className="h-5 w-5 shrink-0 text-primary"
                      weight="regular"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action */}
              <Button
                variant={plan.isPopular ? "default" : "outline"}
                className={`mt-auto h-12 w-full rounded-full text-base font-semibold ${
                  plan.isPopular
                    ? ""
                    : "border-primary/20 text-primary hover:bg-primary/5"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "Why should I use Remindo instead of WhatsApp or a notebook?",
      answer: (
        <div className="space-y-2">
          <p className="font-medium text-foreground">
            WhatsApp chats get lost and notebooks are hard to manage.
          </p>
          <p>
            Remindo gives you one organized place to track customer reminders,
            notes, calls, and visits — so no customer gets forgotten.
          </p>
        </div>
      ),
      isHighlighted: true,
    },
    {
      question: "What is Remindo?",
      answer: (
        <div className="space-y-2">
          <p>
            Remindo is a lightweight customer reminder system for small
            businesses.
          </p>
          <p>
            Track customer calls, visits, notes, and reminders in one place so
            you never miss an important customer interaction.
          </p>
        </div>
      ),
    },
    {
      question: "Who is Remindo for?",
      answer: (
        <div className="space-y-2">
          <p>Remindo is built for small businesses and local shops such as:</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>Clothing stores</li>
            <li>Electronics shops</li>
            <li>Repair services</li>
            <li>Salons & spas</li>
            <li>Clinics</li>
            <li>Machinery & equipment businesses</li>
            <li>Service-based businesses</li>
          </ul>
          <p className="pt-2">
            If you regularly talk to customers and need reminders, Remindo can
            help.
          </p>
        </div>
      ),
    },
    {
      question: "Do I need technical knowledge to use Remindo?",
      answer: (
        <div className="space-y-2">
          <p className="font-medium text-foreground">No.</p>
          <p>
            Remindo is designed to be simple and easy to use. You can start
            adding customers and reminders in minutes — no setup or training
            required.
          </p>
        </div>
      ),
    },
    {
      question: "What kind of reminders can I set?",
      answer: (
        <div className="space-y-2">
          <p>You can schedule reminders for:</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>Customer callbacks</li>
            <li>Store visits</li>
            <li>Payment reminders</li>
            <li>Service renewals</li>
            <li>Product follow-ups</li>
            <li>Important customer notes</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How will I receive reminders?",
      answer:
        "Remindo sends email reminders before a task is due, so you don’t forget important customer interactions.",
    },
    {
      question: "Can my team use Remindo?",
      answer:
        "Yes. Depending on your plan, you can share customer information and reminders with team members to stay organized together.",
    },
    {
      question: "Is there a free trial?",
      answer: (
        <div className="space-y-2">
          <p className="font-medium text-foreground">
            Yes — every account starts with a 7-day free trial.
          </p>
          <p>
            No complicated setup. Start using Remindo and see if it fits your
            business.
          </p>
        </div>
      ),
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. You can upgrade, downgrade, or cancel your plan anytime.",
    },
    {
      question: "Is my customer data safe?",
      answer:
        "Yes. Your customer information is securely stored and backed up to help keep your business data protected.",
    },
    {
      question: "How long does setup take?",
      answer: (
        <div className="space-y-2">
          <p>Most businesses can get started in less than 5 minutes.</p>
          <p className="font-medium text-primary">
            Add customers → set reminders → start receiving alerts.
          </p>
        </div>
      ),
    },
  ]

  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Questions before you get started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`rounded-2xl border px-6 transition-colors ${
                faq.isHighlighted
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <AccordionTrigger
                className={`text-left text-base font-semibold hover:no-underline sm:text-lg ${faq.isHighlighted ? "text-primary" : "text-foreground"}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Main CTA Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-20 text-center shadow-lg sm:px-16 sm:py-24 md:rounded-[3rem]">
          {/* Decorative Corner Elements */}
          {/* Top Right */}
          <div
            className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-black/10 sm:h-80 sm:w-80"
            aria-hidden="true"
          />
          {/* Bottom Left */}
          <div
            className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/10 sm:h-64 sm:w-64"
            aria-hidden="true"
          />

          {/* Content Wrapper (z-10 ensures it sits above the decorative elements) */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Stop forgetting customers.
              <br className="hidden md:block" /> Start building repeat business.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Join local businesses using Remindo to stay organized and never
              miss important customer reminders again.
            </p>

            <div className="mt-10 flex justify-center">
              {/* Forced white button to contrast with the primary background */}
              <Button
                size="lg"
                className="rounded-full bg-white text-base font-bold text-primary shadow-md hover:bg-white/90"
              >
                Start Free — No Credit Card Required
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mt-16 w-full py-10">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <WhoItsForSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
