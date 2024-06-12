interface AuthLayoutProps {
    children: React.ReactNode
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {
    return <div className="min-h-screen mx-auto w-full max-w-[500px] mt-20 px-4">{children}</div>
  }