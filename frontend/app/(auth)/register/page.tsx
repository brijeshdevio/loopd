"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "@phosphor-icons/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ShopCategory() {
  const category = ["SALON", "MEDICAL", "GYM", "RETAIL", "ELECTRONICS", "OTHER"]
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select shop category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category?.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1)

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and create the user here
    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the business details and redirect
    console.log("Redirecting to dashboard...")
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side: Marketing / Trust (Hidden on mobile for a cleaner auth experience) */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex xl:p-16">
        <div>
          <Badge
            variant={"secondary"}
            className="mb-8 rounded-full px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.2em] text-secondary-foreground uppercase"
          >
            Lightweight • Customer Reminders
          </Badge>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight xl:text-5xl">
            Stop forgetting customers. <br /> Grow repeat business.
          </h1>

          <p className="max-w-md text-lg text-primary-foreground/80">
            Remindo helps small businesses manage customer reminders, calls,
            visits, and notes — without the complexity of a CRM.
          </p>

          <div className="mt-12 space-y-5">
            {[
              "Never miss customer callbacks",
              "Get reminder emails automatically",
              "Organize customer notes in one place",
              "Setup in under 2 minutes",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle
                  className="h-6 w-6 text-primary-foreground"
                  weight="fill"
                />
                <span className="text-lg font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-sm font-medium text-primary-foreground/80">
            Trusted by growing local businesses.
          </p>
        </div>
      </div>

      {/* Right Side: Two-Step Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile-only branding (shows when the left panel is hidden) */}
          <div className="text-center lg:hidden">
            <h2 className="text-2xl font-extrabold text-primary">Remindo.</h2>
          </div>

          {step === 1 ? (
            /* STEP 1: ACCOUNT CREATION */
            <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Create your account
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start your 7-day free trial.
                </p>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                  <p className="text-xs text-muted-foreground">
                    Minimum 8 characters
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Create Free Account
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="#signin"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </a>
              </div>
            </div>
          ) : (
            /* STEP 2: BUSINESS ONBOARDING */
            <div className="animate-in duration-500 fade-in slide-in-from-right-8">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Tell us about your business
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  This helps personalize your workspace.
                </p>
              </div>

              <form onSubmit={handleStep2Submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input
                    id="shopName"
                    placeholder="e.g. Remindo Salon"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Shop Category</Label>
                  <ShopCategory />
                </div>

                <Button
                  type="submit"
                  className="mt-4 h-12 w-full text-base font-semibold"
                >
                  Continue to Dashboard
                </Button>

                {/* Optional back button for better UX */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full text-muted-foreground"
                >
                  Back
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
