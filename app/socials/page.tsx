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


export default function SocialsPage() {
  const router = useRouter() // Initialize useRouter

  const handleNextClick = () => {
    router.push("/register") // Replace '/next-page' with your desired path
  }

  return (
    <Card className="mx-auto w-full max-w-[500px]  mt-20 px-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Socials</CardTitle>
        <CardDescription className="py-3">
          What are your social handles? Add your usernames to which ever
          platform you have an account on (optional)
        </CardDescription>
        </CardHeader>
        <CardContent className="mx-auto grid gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="twitter_id" className="whitespace-nowrap text-gray-600 text-sm">
                twitter.com/@
              </Label>
              <Input id="twitter_id" type="text" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="instagram_id" className="whitespace-nowrap text-gray-600 text-sm">
                instagram.com/@
              </Label>
              <Input id="instagram_id" type="text" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="facebook_id" className="whitespace-nowrap text-gray-600 text-sm">
                tiktok.com/@
              </Label>
              <Input id="facebook_id" type="text" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="facebook_id" className="whitespace-nowrap text-gray-600 text-sm">
                facebook.com/@
              </Label>
              <Input id="facebook_id" type="text" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="facebook_id" className="whitespace-nowrap text-gray-600 text-sm">
                linkedin.com/@
              </Label>
              <Input id="facebook_id" type="text" />
            </div>
          </div>
        </CardContent>
       
      <CardFooter className="justify-end">
        {/* <div className="flex justify-end items-center"> */}

        <Button className="w-50 ml-5" onClick={handleNextClick}>
          Next
        </Button>
        {/* </div> */}
      </CardFooter>
    </Card>
  )
}
