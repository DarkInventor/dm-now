"use client"

import { useRouter } from "next/navigation"
import { Label } from "@radix-ui/react-label"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import OnboardingPage from "@/app/onboarding/page"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="mx-auto px-4">
    <Card className="w-full max-w-[500px] mt-20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <a
          href="/forgot-password"
          className="text-black-500 text-sm hover:underline "
        >
          Forgot your password?
        </a>
        <div className="flex justify-between items-center">
          <a
            href="/onboarding"
            className="text-black-500 text-sm hover:underline"
          >
            Need an account?
          </a>
          <Button className="w-50 ml-5" onClick={() => router.push("/profile")}>
            Login
          </Button>
        </div>
      </CardFooter>
      <CardContent className="grid gap-4 mx-auto">
        <div className="grid w-full mx-auto">
          <Button variant="outline" onClick={() => router.push("/onboarding")}>
            {/* <Icons.gitHub className="mr-2 size-4" /> */}
            What&apos;s dm-Now?
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
