

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 px-4 text-center">
      <div
        className="
          text-red-500
          text-2xl
          sm:text-3xl
          md:text-4xl
          mb-3
        "
      >
        ⚠️
      </div>

      <h2
        className="
          font-semibold text-gray-800
          text-base
          sm:text-lg
          md:text-xl
        "
      >
        Oops! Something went wrong.
      </h2>
    </div>
  );
}

export default ErrorState;
