import { Spinner } from "@nextui-org/react";

const LoadingSection = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Spinner color="primary" label="Loading" size="lg" />
      </div>
    </section>
  );
};

export default LoadingSection;
