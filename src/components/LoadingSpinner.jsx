function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        className="w-12 h-12 rounded-full animate-spin border-y-2 border-solid border-blue-500 border-t-transparent"
      ></div>
    </div>
  );
}

export default LoadingSpinner;
