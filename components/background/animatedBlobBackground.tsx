import BackgroundBlob from "../svg/backgroundBlob";

const AnimatedBlobBackground = () => {
  return (
    <div className="absolute z-[-100] w-[100vw] overflow-hidden h-full transition-all opacity-80">
      <BackgroundBlob className="transition-all absolute w-full h-full top-[-300px] left-[-800px] rotate-45" />
      <BackgroundBlob
        type="secondary"
        className="absolute w-[1200px] h-fit top-[-400px] right-[-300px] transition-all"
      />
    </div>
  );
};

export default AnimatedBlobBackground;
