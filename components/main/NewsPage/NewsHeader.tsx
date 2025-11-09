const NewsHeader = () => (
  <header className="mb-16 border-b border-gray-200 pb-8">
    <h1
      className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
      style={{
        fontSize: "clamp(2rem, 0.3723rem + 7.234vw, 6.25rem)",
        lineHeight: 1.1,
      }}
    >
      Perspectives, Publications, and Press
    </h1>
    <p
      className="font-medium text-gray-600"
      style={{ fontSize: "clamp(1rem, 0.617rem + 1.7021vw, 1.8rem)" }}
    >
      From international features to internal thinking, this is where we
      document what we're doing — and what we're exploring. Expect
      insights, studio updates, opinion pieces, and the latest releases
      from our publishing platforms.
    </p>
  </header>
);

export default NewsHeader;
