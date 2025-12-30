
type headerProps = {
  title: string;
  paragraph: string
}

const Header = ({title, paragraph}: headerProps) => (
  <header className="mb-16 border-gray-200 pb-8">
    <h1 className="w-full text-4xl md:text-7xl font-extrabold">
      {title}
    </h1>
    <p className="text-2xl md:text-4xl font-semibold mt-6">
      {paragraph}
    </p>
  </header>
);

export default Header;
