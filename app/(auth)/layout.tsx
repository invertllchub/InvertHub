
import Logo from "@/components/main/Logo";



export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={`w-full h-screen flex items-center justify-center`}>
          <div className="fixed top-0 left-0 z-40">
            <Logo isDark={false}/>
          </div>
          {children}
        </div>
    );
}
