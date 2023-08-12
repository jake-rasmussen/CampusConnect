import { Checkbox } from "./shadcn_ui/checkbox";

const Checklist = () => {
  return (
    <>
      <div className="flex flex-col gap-y-2 p-4 text-white">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms2"
            className="bg-white text-black checked:bg-white"
          />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms2"
            className="bg-white text-black checked:bg-white"
          />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
    </>
  );
};

export default Checklist;
