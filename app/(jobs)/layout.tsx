import '../(main)/globals.css';

export const metadata = {
  title: "Invert-Hub-jobs",
  icons: {
    icon: "https://res.cloudinary.com/dyfregti9/image/upload/v1759146343/job-icon_cf8vwe.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={` antialiased`}
    >
      {children}
    </div>
  );
}
