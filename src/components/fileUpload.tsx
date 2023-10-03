import { Input } from "./shadcn_ui/input";

const FileUpload = () => {
  return (
    <>
      <input
        className="block w-full cursor-pointer rounded-lg rounded-xl border bg-white p-3 
        file:mr-2 file:rounded-full file:border-none file:bg-secondary file:px-4 file:py-2 file:font-black file:uppercase file:text-white file:shadow-xl"
        id="file_input"
        type="file"
      />
    </>
  );
};

export default FileUpload;
