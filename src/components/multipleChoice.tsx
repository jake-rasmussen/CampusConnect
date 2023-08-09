import { Label } from "./shadcn_ui/label";
import { RadioGroup, RadioGroupItem } from "./shadcn_ui/radio-group";

const MultipleChoice = () => {
  return (
    <>
      <RadioGroup defaultValue="comfortable" className="text-white p-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" className="text-primary bg-white"/>
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" className="text-primary bg-white"/>
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" className="text-primary bg-white" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
