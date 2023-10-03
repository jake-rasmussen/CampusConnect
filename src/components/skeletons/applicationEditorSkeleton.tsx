import { Skeleton } from "../shadcn_ui/skeleton";

const ApplicationEditorSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-20">
        <main className="flex flex-col items-center gap-4 py-4">
          <section className="flex w-[50rem] flex-col gap-4">
            <span className="text-xl font-semibold">Application Name</span>
            <Skeleton className="h-[5rem] w-full" />
          </section>
          <section className="flex w-[50rem] flex-col gap-4">
            <span className="text-xl font-semibold">
              Application Description
            </span>
            <Skeleton className="h-[5rem] w-full" />
          </section>

          <section className="flex flex-col items-center gap-4 py-8">
            <span className="text-center text-4xl font-semibold ">
              Questions
            </span>
            <Skeleton className="h-[30rem] w-[50rem]" />
          </section>
        </main>
      </div>
    </>
  );
};

export default ApplicationEditorSkeleton;
