"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@radix-ui/react-select"
import { ArrowRight } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { supabase } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Updated schema including all fields
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  twitter_id: z
    .string()
    .min(2, { message: "Twitter ID must be at least 2 characters." }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  directToDM: z.boolean(),
  redirectCustomURL: z.boolean(),
  showPage: z.boolean(),
  instagram_id: z.string().optional(),
  tiktok_id: z.string().optional(),
  facebook_id: z.string().optional(),
  linkedin_id: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function BrandProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: "onChange",
  })

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user
        if (user) {
          console.log("User:", user)
          console.log("User id:", user.id)

          // Fetch profile data for the logged-in user
          const { data, error } = await supabase
            .from("brand_profiles")
            .select("*")
            .eq("id", user.id)

          if (error) {
            console.error("Error fetching profile data:", error)
            return
          }

          if (data) {
            console.log("Profile data from db retrieved:", data)
            // Dynamically set the form values with the fetched data
            form.reset({
              username: data[0].username,
              email: data[0].email,
              twitter_id: data[0].twitter_url,
              instagram_id: data[0].instagram_url,
              tiktok_id: data[0].tiktok_url,
              facebook_id: data[0].facebook_url,
              linkedin_id: data[0].linkedin_url,
              // Add other fields as necessary
              // For arrays or objects, ensure they are formatted as expected by your form
            })
          }
        } else {
          console.log("No user found.")
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [form])

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const router = useRouter()

  const handleNextClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      const url = `${window.location.origin}/login`;
      router.push(url);
    } else {
      console.error('Error signing out:', error);
    }
   
  
    if (error) {
      console.error('Error signing out:', error);
    }
      
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto mt-2 px-4 mb-10"
      >
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          My Information
        </h3>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="naruto@example.com" {...field} />
              </FormControl>              
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="mt-8 scroll-m-20 text-2xl font-medium tracking-tight">
          Social Media
        </h3>    

        <FormField
          control={form.control}
          name="twitter_id"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel
                htmlFor="twitter_id"
                className="whitespace-nowrap text-gray-600 text-sm"
              >
                twitter.com/@
              </FormLabel>
              <FormControl>
                <Input id="twitter_id" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram_id"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel
                htmlFor="instagram_id"
                className="whitespace-nowrap text-gray-600 text-sm"
              >
                instagram.com/@
              </FormLabel>
              <FormControl>
                <Input id="instagram_id" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktok_id"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel
                htmlFor="tiktok_id"
                className="whitespace-nowrap text-gray-600 text-sm"
              >
                tiktok.com/@
              </FormLabel>
              <FormControl>
                <Input id="tiktok_id" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook_id"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel
                htmlFor="facebook_id"
                className="whitespace-nowrap text-gray-600 text-sm"
              >
                facebook.com/@
              </FormLabel>
              <FormControl>
                <Input id="facebook_id" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin_id"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel
                htmlFor="linkedin_id"
                className="whitespace-nowrap text-gray-600 text-sm"
              >
                linkedin.com/@
              </FormLabel>
              <FormControl>
                <Input id="linkedin_id" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      
        <Button
          type="submit"
          className="mb-20 flex justify-center items-center gap-2"
          onClick={handleNextClick}
        >
         Logout 
        </Button>

        <h3 className="mt-8 scroll-m-20 text-md text-gray-600 tracking-tight">
          Need to update your profile information? Please contact us via email at <a href="mailto:ktmehta25@gmail.com" className="text-blue-600 hover:text-blue-800">ktmehta25@gmail.com</a>.
        </h3>

        {/* <Button type="submit" className="mb-20">Update profile</Button> */}
      </form>
    </Form>
  )
}
