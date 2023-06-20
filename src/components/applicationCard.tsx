import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ApplicationCard = () => {
  return (
    <>
      <Card className="m-6 mb-0 w-[20rem] rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p className="flex w-full justify-end">
            <button className="flex flex-row text-secondary transition duration-300 ease-in-out hover:translate-x-2 mr-1">
              Apply <ArrowRight className="mx-1 h-full" />
            </button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ApplicationCard;
