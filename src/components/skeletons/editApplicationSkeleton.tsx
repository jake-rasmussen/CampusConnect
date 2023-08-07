import ApplicationEditorSkeleton from "./applicationEditorSkeleton";
import HeaderSkeleton from "./headerSkeleton";

const EditApplicationSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />

      <main className="py-10">
        <div className="mx-20">
          <ApplicationEditorSkeleton />
        </div>
      </main>
    </>
  );
}

export default EditApplicationSkeleton;