import { Spinner } from "@nextui-org/react";

const LoadingPage = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Spinner color="primary" size="lg" className="scale-150" label="Loading" />
      </div>
    </section>
  );
};

export default LoadingPage;
