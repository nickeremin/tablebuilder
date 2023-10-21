import { AuthNav, HomeFooter } from "@/widgets/layout"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-screen">
        <AuthNav />
        {children}
      </div>
      <HomeFooter />
    </div>
  )
}

export default AuthLayout
