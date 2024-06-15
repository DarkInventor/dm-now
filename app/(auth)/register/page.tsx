// "use client"

// import React, { useState } from "react"
// import { redirect, useRouter } from "next/navigation"
// import { Label } from "@radix-ui/react-label"

// import { supabase } from "@/lib/api"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Icons } from "@/components/icons"


// export default function RegisterPage() {
//   const router = useRouter()
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const [socialHandles, setSocialHandles] = useState({
//     twitter: "",
//     instagram: "",
//     tiktok: "",
//     facebook: "",
//     linkedin: "",
//   })
//   const [username, setUsername] = useState("")

//   React.useEffect(() => {
//     // Use window.location.search to get query string
//     const searchParams = new URLSearchParams(window.location.search)
//     const usernameFromQuery = searchParams.get("username") || ""
//     setUsername(usernameFromQuery)

//     // Initialize an object to hold the social handles
//     let socialHandlesFromQuery = {
//       twitter: "",
//       instagram: "",
//       tiktok: "",
//       facebook: "",
//       linkedin: "",
//     }

//     // Iterate over the keys of the socialHandles object
//     Object.keys(socialHandlesFromQuery).forEach((key) => {
//       // For each key, get the corresponding value from the URL parameters
//       const value = searchParams.get(key)
//       // If the value is not null, update the socialHandles object
//       if (value !== null) {
//         // @ts-ignore
//         socialHandlesFromQuery[key] = value
//       }
//     })

//     setSocialHandles(socialHandlesFromQuery)

//     console.log("Username:", usernameFromQuery)
//     console.log("Social Handles:", socialHandlesFromQuery)
//   }, [])

//   // const handleRegister = () => {
//   //   console.log("Registering with details:");
//   //   console.log("Username:", username);
//   //   console.log("Social Handles:", socialHandles);
//   //   console.log("Name:", name);
//   //   console.log("Email:", email);
//   //   console.log("Password:", password);

//   //   router.push('/profile');
//   // }

//   const handleRegister = async () => {
//     console.log("Registering with details:")
//     console.log("Username:", username)
//     console.log("Social Handles:", socialHandles)

//     const twitter_url = socialHandles.twitter
//     const instagram_url = socialHandles.instagram
//     const tiktok_url = socialHandles.tiktok
//     const facebook_url = socialHandles.facebook
//     const linkedin_url = socialHandles.linkedin

//     console.log("Social Handlesssss:", {
//       twitter_url,
//       instagram_url,
//       tiktok_url,
//       facebook_url,
//       linkedin_url,
//     })
//     console.log("Name:", name)
//     console.log("Email:", email)
//     console.log("Password:", password)

//     try {
//       // Step 1: Sign up the user using Supabase Auth
//       const data = {
//         email,
//         password,
//       }

//       console.log("email inside try block::", data.email)
//       const { error } = await supabase.auth.signUp(data)

//       if (error) {
//         console.error("Signup error:", error.message);
//         redirect("/error")
//       }

//       console.log("userrrrr info:", error);



//       // const { data: { user } } = await supabase.auth.getUser();
//       // console.log(user)
      
//       // await supabase.from('profiles').insert([{ id: user?.id }]);
//       // await showToast({ message: 'Check your email for the confirmation link!' });
//       // router.push('/confirm');

//       console.log("User signed up:", email)

//       router.push("/profile")

//       // // Step 2: Insert user details into the influencer_profiles table
//       // const { data, error: insertError } = await supabase
//       //   .from('influencer_profiles')
//       //   .insert([
//       //     {
//       //      / Use the ID from the created user
//       //       username: username,
//       //       name: name,
//       //       twitter_url: socialHandles.twitter,
//       //       instagram_url: socialHandles.instagram,
//       //       tiktok_url: socialHandles.tiktok,
//       //       facebook_url: socialHandles.facebook,
//       //       linkedin_url: socialHandles.linkedin,
//       //     },
//       //   ]);

//       // if (insertError) throw insertError;

//       // console.log("Profile created:", data);

//       // // Redirect the user to the profile page upon successful registration
//       // router.push('/profile');
//     } catch (error) {
//       console.error("Registration error:", error)
//       alert("Registration failed: " + error.message)
//     }
//   }

//   return (
//     <Card className="mx-auto w-full max-w-[500px] ">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl">Create an account</CardTitle>
//         <CardDescription>
//           Enter your email below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="mx-auto grid gap-4">
//         <div className="grid gap-2">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="m@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="items-top flex space-x-2">
//           <Checkbox id="terms1" />
//           <div className="grid gap-1.5 leading-none">
//             <label
//               htmlFor="terms1"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               Accept terms and conditions
//             </label>
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="justify-between">
//         <a
//           href="/forgot-password"
//           className="text-black-500 text-sm hover:underline "
//         >
//           Forgot your password?
//         </a>
//         <div className="flex items-center justify-between">
//           <a href="/" className="text-black-500 text-sm hover:underline">
//             Already registered?
//           </a>
//           <Button className="w-50 ml-5" onClick={handleRegister}>
//             Register
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

import { supabase } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type SocialHandles = {
  twitter: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  linkedin: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [socialHandles, setSocialHandles] = useState<SocialHandles>({
    twitter: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    linkedin: "",
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const usernameFromQuery = searchParams.get("username") || "";
    setUsername(usernameFromQuery);

    let socialHandlesFromQuery: SocialHandles = {
      twitter: "",
      instagram: "",
      tiktok: "",
      facebook: "",
      linkedin: "",
    };

    Object.keys(socialHandlesFromQuery).forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        (socialHandlesFromQuery as any)[key] = value;
      }
    });

    setSocialHandles(socialHandlesFromQuery);

    console.log("Username:", usernameFromQuery);
    console.log("Social Handles:", socialHandlesFromQuery);
  }, []);

  const handleRegister = async () => {
    console.log("Registering with details:");
    console.log("Username:", username);
    console.log("Social Handles:", socialHandles);

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://dm-now.vercel.app/profile' // Set your redirect URL here
        }
      });

      if (error) {
        console.error("Signup error:", error.message);
        alert("Registration failed: " + error.message);
        return;
      }

      const user = data.user;
      if (user) {
        console.log("User signed up:", user.email);

        const { data: profileData, error: insertError } = await supabase
          .from("influencer_profiles")
          .insert([
            {
              id: user.id,
              username: username,
              name: name,
              email: email, // Include the email in the profile
              twitter_url: socialHandles.twitter,
              instagram_url: socialHandles.instagram,
              tiktok_url: socialHandles.tiktok,
              facebook_url: socialHandles.facebook,
              linkedin_url: socialHandles.linkedin,
            },
          ]);

        if (insertError) {
          console.error("Error inserting user profile:", insertError);
        } else {
          console.log("Profile created:", profileData);
        }
        setTimeout(() => {
          alert("We sent you a confirmation email. Please confirm it to activate your account and see the information here.");
        }, 3000);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // // @ts-ignore
      // alert("Registration failed: " + error.message);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
          className="text-black-500 text-sm hover:underline"
        >
          Forgot your password?
        </a>
        <div className="flex items-center justify-between">
          <a href="/" className="text-black-500 text-sm hover:underline">
            Already registered?
          </a>
          <Button className="w-50 ml-5" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
