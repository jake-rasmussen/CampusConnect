import { Checkbox } from "./shadcn_ui/checkbox";

const Checklist = () => {
  return (
    <>
      <div className="p-4 text-white flex flex-col gap-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" className="bg-white checked:bg-white text-black" />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" className="bg-white checked:bg-white text-black" />
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
