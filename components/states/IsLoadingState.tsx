function IsLoadingState() {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div
        className="
          rounded-full
          animate-spin
          border-gray-300 border-t-blue-500
          w-6 h-6 border-2
          sm:w-8 sm:h-8 sm:border-3
          md:w-10 md:h-10 md:border-4
        "
      />
    </div>
  );
}

export default IsLoadingState;

