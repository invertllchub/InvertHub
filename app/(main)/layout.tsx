
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/components/main/NavBar"));
const Footer = dynamic(() => import("@/components/main/Footer"));


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
        {children}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
