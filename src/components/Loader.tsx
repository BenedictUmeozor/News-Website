import { BounceLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.2)" }}
      className="fixed h-screen w-full z-50 top-0 left-0 flex items-center justify-center"
    >
      <BounceLoader color="#195A94" size={"5rem"} />
    </div>
  );
};
export default Loader;
