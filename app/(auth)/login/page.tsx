"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import OnboardingPage from "@/app/onboarding/page"
import { useEffect, useState } from 'react'; 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabase }  from '@/lib/api'


const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  email: '',
  password: '',
}

export default function LoginPage() {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push("/profile");
      } else {
        setLoading(false);
      }
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.push("/profile");
        router.refresh();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleBrandRegistration = () => {
    // alert("Logging in"); 
    router.push("/brand-login");
    // Here you can use form.getValues() to get email and password
    console.log("Logging in with:", form.getValues());
    // router.push("/profile");
  };

  function onSubmit(data: LoginFormValues) {
    console.log("Submitted data:", data);
    // Perform login operation
    const { email, password } = data;
    console.log("Email:", email, "Password:", password);

    supabase.auth.signInWithPassword({
      email,
      password
    })
    .then((response ) => {
      if (response.error) {
        console.error("Signin error:", response.error.message);
        alert("Signin failed: " + response.error.message);
      } else {
        console.log("Signin successful", response.data.user);
        // const { data: { user } } = await supabase.auth.getUser();
      // console.log(user)
      router.refresh()
        router.push("/profile");
        
      }
    });
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto mt-2 px-4 mb-10"
      >
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
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="naruto@dm.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className="grid gap-2">
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <Button className="w-50 ml-5">
                  Login
                </Button>
              </div>
            </CardFooter>
            <CardContent className="grid gap-4 mx-auto">
              <div className="grid w-full mx-auto">
                <Button variant="outline" onClick={handleBrandRegistration}>
                  {/* <Icons.gitHub className="mr-2 size-4" /> */}
                  Brands: Register Here
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  )
}
