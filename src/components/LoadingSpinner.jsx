import { BeatLoader } from "react-spinners";
import logo from "../../public/spinner_logo.png";

function LoadingSpinner() {
  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <img className="my-4" src={logo} alt="" />
      <BeatLoader
        color={"#078669"}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.5}
      />
    </div>
  );
}

export default LoadingSpinner;
