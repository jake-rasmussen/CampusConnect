import { Loader3 } from "tabler-icons-react";

const LoadingPage = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader3 className="h-auto w-[20vh] animate-spin text-primary" />
      </div>
    </section>
  );
};

export default LoadingPage;
