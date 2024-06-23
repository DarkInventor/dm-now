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
import React from "react"


export default function BrandSocialsPage() {
  const router = useRouter() 

    
  const [socialHandles, setSocialHandles] = React.useState({
    twitter: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    linkedin: '',
  });
  
  React.useEffect(() => {
    // Use window.location.search to get query string
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
    console.log("inside social", username);
  }, []);

  // @ts-ignore
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSocialHandles(prevState => ({
      ...prevState,
      [id]: value,
    }));
  }

  // Initialize useRouter

  const handleNextClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username') || '';
    console.log("inside handlenextclick in socials :: ", username);
    console.log("socials", socialHandles);
  
    // Serialize socialHandles object into a query string
    const socialHandlesQuery = Object.entries(socialHandles).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
  
    // Append username and socialHandles to the URL
    const url = `/brand-register?username=${encodeURIComponent(username)}&${socialHandlesQuery}`;
    router.push(url);
  }

  return (
    <div className="px-4 flex mx-auto">
      <Card className="mx-auto w-full max-w-[500px] mt-20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Socials</CardTitle>
          <CardDescription className="py-3">
            What are your social handles? Add your usernames to whichever
            platform you have an account on (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="mx-auto grid gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="twitter" className="whitespace-nowrap text-gray-600 text-sm">
                twitter.com/@
              </Label>
              <Input id="twitter" type="text" value={socialHandles.twitter} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="instagram" className="whitespace-nowrap text-gray-600 text-sm">
                instagram.com/@
              </Label>
              <Input id="instagram" type="text" value={socialHandles.instagram} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="tiktok" className="whitespace-nowrap text-gray-600 text-sm">
                tiktok.com/@
              </Label>
              <Input id="tiktok" type="text" value={socialHandles.tiktok} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="facebook" className="whitespace-nowrap text-gray-600 text-sm">
                facebook.com/@
              </Label>
              <Input id="facebook" type="text" value={socialHandles.facebook} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="linkedin" className="whitespace-nowrap text-gray-600 text-sm">
                linkedin.com/@
              </Label>
              <Input id="linkedin" type="text" value={socialHandles.linkedin} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="w-50 ml-5" onClick={handleNextClick}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
