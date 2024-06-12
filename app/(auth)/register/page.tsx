"use client"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter();

  return (
    <Card className="mx-auto w-full max-w-[500px] "> 
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mx-auto">
      <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
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
            href="/"
            className="text-black-500 text-sm hover:underline"
          >
            Already registered?
          </a>
          <Button className="w-50 ml-5" onClick={() => router.push('/profile')}>Register</Button>
        </div>
      </CardFooter>
      {/* <CardContent className="grid gap-4 mx-auto">
      <div className="grid w-full mx-auto">
        
          <Button variant="outline">
          What&apos;s dm-Now?  
          </Button>
          
        </div>
        </CardContent> */}
    </Card>
  )
}
