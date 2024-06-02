import { PulseLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <PulseLoader
        color={"#078669"}
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingSpinner;
