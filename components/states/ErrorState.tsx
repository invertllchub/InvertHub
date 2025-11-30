

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="text-red-600 text-3xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h2>
    </div>
  );
}

export default ErrorState;
