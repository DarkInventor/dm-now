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
import { useRouter } from 'next/navigation' 

export default function OnboardingPage() {

    const router = useRouter() // Initialize useRouter

    const handleNextClick = () => {
      router.push('/socials') // Replace '/next-page' with your desired path
    }
  

  return (
    <Card className="mx-auto w-full max-w-[500px]  mt-20 px-4 ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Onboarding</CardTitle>
        <CardDescription className="py-3">
          dm•now is a new link in bio service that is being built from the
          ground up to facilitate real, sincere, human to human direct
          messaging.
          <p className="mt-3">
            Instead of spreading your DMs across all platforms, and dealing with
            high volumes of spam, scams and automated &quot;sales&quot;, dm•now will let
            you take control of your DMs, so that you get the final say in who,
            when and how people can DM you.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto grid gap-2">
        <div className="grid gap-2">
          <Label htmlFor="username" className="font-[500]">
            Choose a username
          </Label>
          <div className="flex items-center gap-2 py-2">
            <Label htmlFor="username" className="whitespace-nowrap">
              dm.now/
            </Label>
            <Input id="username" type="text" placeholder="naruto" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        
        {/* <div className="flex justify-end items-center"> */}
         
          <Button className="w-50 ml-5" onClick={handleNextClick}>Next</Button>
        {/* </div> */}
      </CardFooter>
   
    </Card>
  )
}
