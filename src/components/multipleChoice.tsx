import { Label } from "./shadcn_ui/label";
import { RadioGroup, RadioGroupItem } from "./shadcn_ui/radio-group";

const MultipleChoice = () => {
  return (
    <>
      <RadioGroup defaultValue="comfortable" className="p-4 text-white">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
            className="bg-white text-primary"
          />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="comfortable"
            id="r2"
            className="bg-white text-primary"
          />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="compact"
            id="r3"
            className="bg-white text-primary"
          />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
