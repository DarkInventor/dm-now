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
import React, { useState } from "react"

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [socialHandles, setSocialHandles] = useState({
    twitter: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    linkedin: '',
  });
  const [username, setUsername] = useState('');

  React.useEffect(() => {
    // Use window.location.search to get query string
    const searchParams = new URLSearchParams(window.location.search);
    const usernameFromQuery = searchParams.get('username') || '';
    setUsername(usernameFromQuery);
  
    // Initialize an object to hold the social handles
    let socialHandlesFromQuery = {
      twitter: '',
      instagram: '',
      tiktok: '',
      facebook: '',
      linkedin: '',
    };
  
    // Iterate over the keys of the socialHandles object
    Object.keys(socialHandlesFromQuery).forEach(key => {
      // For each key, get the corresponding value from the URL parameters
      const value = searchParams.get(key);
      // If the value is not null, update the socialHandles object
      if (value !== null) {
        // @ts-ignore
        socialHandlesFromQuery[key] = value;
      }
    });
  
    setSocialHandles(socialHandlesFromQuery);
  
    console.log("Username:", usernameFromQuery);
    console.log("Social Handles:", socialHandlesFromQuery);
  }, []);

  const handleRegister = () => {
    console.log("Registering with details:");
    console.log("Username:", username);
    console.log("Social Handles:", socialHandles);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    
    router.push('/profile');
  }


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
          <Input id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button className="w-50 ml-5" onClick={handleRegister}>Register</Button>
        </div>
      </CardFooter>
    </Card>
  )
} 
