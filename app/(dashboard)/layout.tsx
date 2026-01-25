
import '../(main)/globals.css'
import dynamic from "next/dynamic";
// Components
const NavBar = dynamic(() => import("@/components/dashboard/Navbar"));



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div >
        <NavBar />
        {children}
      </div>
    );
}
