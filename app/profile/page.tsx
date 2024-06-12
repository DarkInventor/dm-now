// "use client"

// import Link from "next/link"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useFieldArray, useForm } from "react-hook-form"
// import { z } from "zod"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { CardContent } from "@/components/ui/card"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"

// const profileFormSchema = z.object({
//   username: z
//     .string()
//     .min(2, {
//       message: "Username must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Username must not be longer than 30 characters.",
//     }),
//     twitter_id: z.string()
//     .min(2, {
//         message: "twitter id must be at least 2 characters.",
//       }),
//     bio: z.string().max(160).min(4),
//   urls: z
//     .array(
//       z.object({
//         value: z.string().url({ message: "Please enter a valid URL." }),
//       })
//     )
//     .optional(),
// })

// type ProfileFormValues = z.infer<typeof profileFormSchema>

// // This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: "I own a computer.",
//   urls: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// }

// export default function ProfilePage() {
//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues,
//     mode: "onChange",
//   })

//   const { fields, append } = useFieldArray({
//     name: "urls",
//     control: form.control,
//   })

//   function onSubmit(data: ProfileFormValues) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 mx-auto mt-2 px-4 mb-10"
//       >
//         <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
//           My page settings
//         </h3>
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name. It can be your real name or a
//                 pseudonym. You can only change this once every 30 days.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* <FormField
//           control={form.control}
//           name="isActive"
//           render={({ field }) => (
//             <FormItem className="mt-2 flex flex-row items-center">
             
//               <FormControl>
//                 <Switch
//                   name={field.name}
//                   id={field.name}
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel className="pb-2 ml-2">Go directly to my DM on</FormLabel>
//             </FormItem>
//           )}
//         /> */}

//         <FormField
//           control={form.control}
//           name="directToDM"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center">
//               <FormControl>
//                 <Switch
//                   name={field.name}
//                   id="directToDM"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel className="ml-2">
//                 Go directly to my DM {field.value ? "on" : "off"}
//               </FormLabel>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="redirectCustomURL"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center">
//               <FormControl>
//                 <Switch
//                   name={field.name}
//                   id="redirectCustomURL"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel className="ml-2">
//                 Redirect to a custom URL {field.value ? "on" : "off"}
//               </FormLabel>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="showPage"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center">
//               <FormControl>
//                 <Switch
//                   name={field.name}
//                   id="showPage"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormLabel className=" ml-2">
//                 Show my page {field.value ? "on" : "off"}
//               </FormLabel>
//             </FormItem>
//           )}
//         />

//         {/*         
//         <CardContent className="mx-auto">
//           <div className="flex flex-col gap-4">
//             <FormField
//               control={form.control}
//               name="twitter_id"
//               render={({ field }) => (
//                 <FormItem className="
//                 items-center ">
//                   <FormLabel
//                     htmlFor="twitter_id"
//                     className="whitespace-nowrap text-gray-600 text-sm"
//                   >
//                     twitter.com/@
//                   </FormLabel>
//                   <FormControl>
//                     <Input id="twitter_id" type="text" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="instagram_id"
//               render={({ field }) => (
//                 <FormItem className="
//                 items-center ">
//                   <FormLabel
//                     htmlFor="instagram_id"
//                     className="whitespace-nowrap text-gray-600 text-sm"
//                   >
//                     instagram.com/@
//                   </FormLabel>
//                   <FormControl>
//                     <Input id="instagram_id" type="text" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="tiktok_id"
//               render={({ field }) => (
//                 <FormItem className="
//                 items-center ">
//                   <FormLabel
//                     htmlFor="tiktok_id"
//                     className="whitespace-nowrap text-gray-600 text-sm"
//                   >
//                     tiktok.com/@
//                   </FormLabel>
//                   <FormControl>
//                     <Input id="tiktok_id" type="text" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="facebook_id"
//               render={({ field }) => (
//                 <FormItem className="
//                 items-center ">
//                   <FormLabel
//                     htmlFor="facebook_id"
//                     className="whitespace-nowrap text-gray-600 text-sm"
//                   >
//                     facebook.com/@
//                   </FormLabel>
//                   <FormControl>
//                     <Input id="facebook_id" type="text" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="linkedin_id"
//               render={({ field }) => (
//                 <FormItem className="
//                  items-center ">
//                   <FormLabel
//                     htmlFor="linkedin_id"
//                     className="whitespace-nowrap text-gray-600 text-sm"
//                   >
//                     linkedin.com/@
//                   </FormLabel>
//                   <FormControl>
//                     <Input id="linkedin_id" type="text" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </CardContent> */}

//         {/* <CardContent className="mx-auto grid grid-cols-1 gap-4"> */}
//         <FormField
//           control={form.control}
//           name="twitter_id"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-2">
//               <FormLabel
//                 htmlFor="twitter_id"
//                 className="whitespace-nowrap text-gray-600 text-sm"
//               >
//                 twitter.com/@
//               </FormLabel>
//               <FormControl>
//                 <Input id="twitter_id" type="text" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="instagram_id"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-2">
//               <FormLabel
//                 htmlFor="instagram_id"
//                 className="whitespace-nowrap text-gray-600 text-sm"
//               >
//                 instagram.com/@
//               </FormLabel>
//               <FormControl>
//                 <Input id="instagram_id" type="text" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="tiktok_id"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-2">
//               <FormLabel
//                 htmlFor="tiktok_id"
//                 className="whitespace-nowrap text-gray-600 text-sm"
//               >
//                 tiktok.com/@
//               </FormLabel>
//               <FormControl>
//                 <Input id="tiktok_id" type="text" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="facebook_id"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-2">
//               <FormLabel
//                 htmlFor="facebook_id"
//                 className="whitespace-nowrap text-gray-600 text-sm"
//               >
//                 facebook.com/@
//               </FormLabel>
//               <FormControl>
//                 <Input id="facebook_id" type="text" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="linkedin_id"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-2">
//               <FormLabel
//                 htmlFor="linkedin_id"
//                 className="whitespace-nowrap text-gray-600 text-sm"
//               >
//                 linkedin.com/@
//               </FormLabel>
//               <FormControl>
//                 <Input id="linkedin_id" type="text" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         {/* </CardContent> */}

//         <Button type="submit" className="mb-20">Update profile</Button>
//       </form>
//     </Form>
//   )
// }



















"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

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
  twitter_id: z.string()
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
  // Ensure to provide default values for all boolean fields as well
  directToDM: false,
  redirectCustomURL: false,
  showPage: true,
  // Add default values for other fields if necessary
}

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto mt-2 px-4 mb-10"
      >
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          My page settings
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
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-row items-center">
             
              <FormControl>
                <Switch
                  name={field.name}
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="pb-2 ml-2">Go directly to my DM on</FormLabel>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="directToDM"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormControl>
                <Switch
                  name={field.name}
                  id="directToDM"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="ml-2">
                Go directly to my DM {field.value ? "on" : "off"}
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="redirectCustomURL"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormControl>
                <Switch
                  name={field.name}
                  id="redirectCustomURL"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="ml-2">
                Redirect to a custom URL {field.value ? "on" : "off"}
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="showPage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormControl>
                <Switch
                  name={field.name}
                  id="showPage"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className=" ml-2">
                Show my page {field.value ? "on" : "off"}
              </FormLabel>
            </FormItem>
          )}
        />

        {/*         
        <CardContent className="mx-auto">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="twitter_id"
              render={({ field }) => (
                <FormItem className="
                items-center ">
                  <FormLabel
                    htmlFor="twitter_id"
                    className="whitespace-nowrap text-gray-600 text-sm"
                  >
                    twitter.com/@
                  </FormLabel>
                  <FormControl>
                    <Input id="twitter_id" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram_id"
              render={({ field }) => (
                <FormItem className="
                items-center ">
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
                <FormItem className="
                items-center ">
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
                <FormItem className="
                items-center ">
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
                <FormItem className="
                 items-center ">
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
          </div>
        </CardContent> */}

        {/* <CardContent className="mx-auto grid grid-cols-1 gap-4"> */}
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
        {/* </CardContent> */}

        <Button type="submit" className="mb-20">Update profile</Button>


        
        {/* <Button type="submit" className="mb-20">Update profile</Button> */}
      </form>
    </Form>
  );
}