"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(30, { message: "Name must not be longer than 30 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    currentPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // This helps to attach the error message to the confirmPassword field
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "hi",
  email: "example@example.com",
  currentPassword: "password123",
  newPassword: "newPassword123",
  confirmPassword: "newPassword123",
}

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated successfully",
      description: JSON.stringify(data, null, 2),
    })
  }

  const router = useRouter()

  const handleNextClick = () => {
    router.push("/register")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto mt-2 px-4 mb-10 w-full max-w-[600px] grid gap-2"
      >
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          My page settings
        </h3>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
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
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="button" className="mx-auto mt-4">
            Save
          </Button>
        </div>

        <hr className="my-4" />

        <div className="mb-4">
        <h4 className="text-lg font-semibold mb-4">Update Password</h4>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="button" className="mx-auto mt-4">
          Save
        </Button>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-4 py-2">Two Factor Authentication</h4>
          <p>You have not enabled two factor authentication.
          When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone&apos;s Google Authenticator application.</p>
          <Button type="button" className="mx-auto mt-4">
            Enable
          </Button>
        </div>

        <hr className="my-4" />
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-4 py-2">Browser Sessions</h4>
          <p>If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.</p>
          <Button type="button" className="mx-auto mt-4">
            Log Out Other Browser Sessions
          </Button>
        </div>

        <hr className="my-4" />
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-4 py-2">Delete Account</h4>
          <p>Once your account is deleted, all of its resources and data will be permanently deleted.
Before deleting your account, please download any data or information that you wish to retain.</p>
          <Button type="button" className="mx-auto mt-4" variant="destructive">
            Log Out Other Browser Sessions
          </Button>
        </div>
          
      </form>
    </Form>
  )
}
