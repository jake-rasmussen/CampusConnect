import { Loader3 } from "tabler-icons-react";

const LoadingSection = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Loader3 className="h-auto w-[10vh] animate-spin text-primary" />
        <div className="mx-4 text-2xl font-bold uppercase">Loading</div>
      </div>
    </section>
  );
};

export default LoadingSection;
