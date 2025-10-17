import { Oval } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Oval
        height={70}
        width={80}
        color="#ec4899"
        secondaryColor="#fbcfe8"
        strokeWidth={4}
        visible={true}
      />
    </div>
  );
}
export default LoadingSpinner;