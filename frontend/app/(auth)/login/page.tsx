"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Quotes } from "@phosphor-icons/react"

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, handle authentication here
    console.log("Logging in...")
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side: Branding & Testimonial (Hidden on mobile) */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex xl:p-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Remindo.</h2>

          <div className="mt-24 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight xl:text-5xl">
              Welcome back to your workspace.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Pick up exactly where you left off. Your customers are waiting.
            </p>
          </div>
        </div>

        {/* Testimonial Block */}
        <div className="relative mt-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8">
          <Quotes
            className="absolute -top-4 -left-2 h-10 w-10 rotate-180 text-primary-foreground/20"
            weight="fill"
          />
          <p className="relative z-10 text-lg leading-relaxed font-medium text-primary-foreground/90">
            {'"'}Since using Remindo, we haven&#39;t missed a single callback.
            Our repeat customer rate went up 30% in the first month just because
            we follow up on time. {'"'}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 font-bold">
              SJ
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground">
                Ankit Saini
              </p>
              <p className="text-xs text-primary-foreground/70">
                Owner, Ankit Shop
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md animate-in duration-500 fade-in slide-in-from-bottom-4">
          {/* Mobile-only branding */}
          <div className="mb-8 text-center lg:hidden">
            <h2 className="text-3xl font-extrabold text-primary">Remindo.</h2>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@remindo.in"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required className="h-12" />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="remember"
                className="border-muted-foreground/50 data-[state=checked]:border-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm leading-none font-medium text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              className="mt-2 h-12 w-full text-base font-semibold"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              href="#register"
              className="font-semibold text-primary hover:underline"
            >
              Start your free trial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
